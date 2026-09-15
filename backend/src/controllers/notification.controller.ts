import { asyncHandler } from "../middlewares/asyncHandler.js";
import type { Request, Response } from "express";
import NotificationService from "../services/notification.service.js";

const NotificationController = {
  // member facing APIs always use the authenticated user
  getMyNotifications: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.user!.id);
    const notifications = await NotificationService.getMyNotifications(userId);

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully!",
      notifications,
    });
  }),

  getUnreadCount: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.user!.id);
    const count = await NotificationService.getUnreadCount(userId);

    return res.status(200).json({
      success: true,
      message: "Unread count retrieved successfully!",
      count,
    });
  }),

  markAsRead: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.user!.id);
    const notificationId = Number(req.params.id);

    await NotificationService.markAsRead(notificationId, userId);

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  }),

  markAllAsRead: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.user!.id);

    await NotificationService.markAllAsRead(userId);

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  }),
};

export default NotificationController;
