import { createContext } from "react";
import type { NotificationResponseDto } from "../../types/notification.type";

interface NotificationContextValue {
  notifications: NotificationResponseDto[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined);