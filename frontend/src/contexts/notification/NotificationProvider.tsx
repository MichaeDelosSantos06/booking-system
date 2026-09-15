import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import useNotificationSocket from "../../hooks/useNotificationSocket";
import { NotificationContext } from "./NotificationContext";

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user } = useAuth();

  // notifications are member side only, admins perform the actions themselves
  const isEnabled = user?.role === "Member";

  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotificationSocket(isEnabled);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading: loading,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}