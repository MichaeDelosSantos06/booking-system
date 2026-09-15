export type NotificationType = "Class" | "Booking" | "Schedule" | "System";

export interface NotificationResponseDto {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

// payload pushed by the backend through the WebSocket
export interface NotificationSocketMessage {
  type: "notification";
  notification: NotificationResponseDto;
}

export interface NotificationListResponse {
  success: boolean;
  message: string;
  notifications: NotificationResponseDto[];
}

export interface UnreadCountResponse {
  success: boolean;
  message: string;
  count: number;
}