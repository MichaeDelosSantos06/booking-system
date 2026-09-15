import { useCallback, useEffect, useState } from "react";

import NotificationService from "../services/notification.service";
import type {
  NotificationListResponse,
  NotificationResponseDto,
  NotificationSocketMessage,
  UnreadCountResponse,
} from "../types/notification.type";

const RECONNECT_DELAY = 3000;

// http://host:port/api -> ws://host:port/ws
const getSocketUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    return null;
  }

  return `${apiUrl.replace(/^http/, "ws").replace(/\/api\/?$/, "")}/ws`;
};

const useNotificationSocket = (isEnabled: boolean) => {
  const [notifications, setNotifications] = useState<NotificationResponseDto[]>(
    []
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // persisted notifications - the database is the source of truth
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let isCancelled = false;

    const loadNotifications = async () => {
      setLoading(true);

      try {
        const [list, unread] = await Promise.all([
          NotificationService.getMyNotifications() as Promise<NotificationListResponse>,
          NotificationService.getUnreadCount() as Promise<UnreadCountResponse>,
        ]);

        if (isCancelled) return;

        setNotifications(list.notifications);
        setUnreadCount(unread.count);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      isCancelled = true;
    };
  }, [isEnabled]);

  // realtime delivery for currently connected members
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const socketUrl = getSocketUrl();

    if (!socketUrl) {
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimer: number | undefined;
    let isDisconnected = false;

    const connect = () => {
      socket = new WebSocket(socketUrl);

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(
            event.data as string
          ) as NotificationSocketMessage;

          if (message.type !== "notification" || !message.notification) {
            return;
          }

          const incoming = message.notification;

          setNotifications((prev) =>
            prev.some((item) => item.id === incoming.id)
              ? prev
              : [incoming, ...prev]
          );

          if (!incoming.isRead) {
            setUnreadCount((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Failed to read notification payload", error);
        }
      };

      socket.onclose = () => {
        if (isDisconnected) {
          return;
        }

        // keep realtime delivery alive across drops
        reconnectTimer = window.setTimeout(connect, RECONNECT_DELAY);
      };
    };

    connect();

    return () => {
      isDisconnected = true;

      if (reconnectTimer !== undefined) {
        window.clearTimeout(reconnectTimer);
      }

      socket?.close();
    };
  }, [isEnabled]);

  const markAsRead = useCallback(
    async (id: number) => {
      const target = notifications.find((item) => item.id === id);

      if (!target || target.isRead) {
        return;
      }

      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));

      try {
        await NotificationService.markAsRead(id);
      } catch (error) {
        console.error("Failed to mark notification as read", error);

        // rollback when the backend rejects the update
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isRead: false } : item
          )
        );
        setUnreadCount((prev) => prev + 1);
      }
    },
    [notifications]
  );

  const markAllAsRead = useCallback(async () => {
    const previous = notifications;

    if (!previous.some((item) => !item.isRead)) {
      return;
    }

    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    setUnreadCount(0);

    try {
      await NotificationService.markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);

      setNotifications(previous);
      setUnreadCount(previous.filter((item) => !item.isRead).length);
    }
  }, [notifications]);

  return {
    // stale state is masked once the member session ends
    notifications: isEnabled ? notifications : [],
    unreadCount: isEnabled ? unreadCount : 0,
    loading: isEnabled ? loading : false,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotificationSocket;
