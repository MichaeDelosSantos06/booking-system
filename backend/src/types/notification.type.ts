import { NotificationType } from "../generated/prisma/enums.js";

export interface NotificationTypeDto {
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
}

// Notification payload before it is assigned to a user
export type CreateNotificationPayload = Omit<NotificationTypeDto, "userId">;
