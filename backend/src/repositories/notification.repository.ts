import prisma from "../lib/prisma.js";
import type { NotificationTypeDto } from "../types/notification.type.js";

const NotificationRepository = {
  create: async (data: NotificationTypeDto) => {
    return prisma.notification.create({
      data,
    });
  },

  createMany: async (data: NotificationTypeDto[]) => {
    return prisma.notification.createManyAndReturn({
      data,
    });
  },

  findByUserId: async (userId: number, take = 50) => {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take,
    });
  },

  countUnread: async (userId: number) => {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  },

  markAsRead: async (id: number, userId: number) => {
    return prisma.notification.updateMany({
      where: { id, userId, isRead: false },
      data: { isRead: true },
    });
  },

  markAllAsRead: async (userId: number) => {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  },
};

export default NotificationRepository;
