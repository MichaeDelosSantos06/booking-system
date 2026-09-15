import { api } from "../api/axios";

const NotificationService = {
  getMyNotifications: async () => {
    const result = await api.get("/notification/my-notifications");
    return result.data;
  },

  getUnreadCount: async () => {
    const result = await api.get("/notification/unread-count");
    return result.data;
  },

  markAsRead: async (id: number) => {
    const result = await api.patch(`/notification/mark-as-read/${id}`);
    return result.data;
  },

  markAllAsRead: async () => {
    const result = await api.patch("/notification/mark-all-as-read");
    return result.data;
  },
};

export default NotificationService;