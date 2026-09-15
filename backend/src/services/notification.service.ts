import NotificationRepository from "../repositories/notification.repository.js";
import UserRepository from "../repositories/user.repository.js";
import type {
  CreateNotificationPayload,
  NotificationTypeDto,
} from "../types/notification.type.js";
import { NotificationType } from "../generated/prisma/enums.js";
import { sendToUser } from "./websockerManager.service.js";

const formatScheduleDateTime = (startAt: Date) =>
  startAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const NotificationService = {
  create: async (data: NotificationTypeDto) => {
    const notification = await NotificationRepository.create(data);
    sendToUser(data.userId, {
      type: "notification",
      notification,
    });

    return notification;
  },

  // persists first (source of truth), then pushes realtime to whoever is connected
  createForUsers: async (data: NotificationTypeDto[]) => {
    if (data.length === 0) {
      return;
    }

    const notifications = await NotificationRepository.createMany(data);

    for (const notification of notifications) {
      sendToUser(notification.userId, {
        type: "notification",
        notification,
      });
    }
  },

  notifyActiveMembers: async (payload: CreateNotificationPayload) => {
    try {
      const memberIds = await UserRepository.findActiveMemberIds();

      await NotificationService.createForUsers(
        memberIds.map((userId) => ({ ...payload, userId })),
      );
    } catch (error) {
      // notification failures must not break the admin action that triggered them
      console.error("Failed to notify members", error);
    }
  },

  notifyUsers: async (
    userIds: number[],
    payload: CreateNotificationPayload,
  ) => {
    try {
      const uniqueUserIds = [...new Set(userIds)];

      await NotificationService.createForUsers(
        uniqueUserIds.map((userId) => ({ ...payload, userId })),
      );
    } catch (error) {
      console.error("Failed to notify members", error);
    }
  },

  notifyNewClass: async (className: string) => {
    await NotificationService.notifyActiveMembers({
      title: "New Class Available",
      message: `A new ${className} class is now available.`,
      type: NotificationType.Class,
    });
  },

  notifyNewSchedule: async (className: string, startAt: Date) => {
    await NotificationService.notifyActiveMembers({
      title: "New Schedule Available",
      message: `A new ${className} schedule is available on ${formatScheduleDateTime(
        startAt,
      )}.`,
      type: NotificationType.Schedule,
    });
  },

  notifyScheduleCancellation: async (
    userIds: number[],
    className: string,
    startAt: Date,
  ) => {
    await NotificationService.notifyUsers(userIds, {
      title: "Schedule Cancelled",
      message: `Your booked ${className} schedule on ${formatScheduleDateTime(
        startAt,
      )} has been cancelled.`,
      type: NotificationType.Schedule,
    });
  },

  // member facing
  getMyNotifications: async (userId: number) => {
    return NotificationRepository.findByUserId(userId);
  },

  getUnreadCount: async (userId: number) => {
    return NotificationRepository.countUnread(userId);
  },

  markAsRead: async (id: number, userId: number) => {
    return NotificationRepository.markAsRead(id, userId);
  },

  markAllAsRead: async (userId: number) => {
    return NotificationRepository.markAllAsRead(userId);
  },
};

export default NotificationService;
