import { Router } from "express";
import NotificationController from "../controllers/notification.controller.js";
import { tokenAuth } from "../middlewares/authenticate.js";

const router = Router();

// Members can only read/update their own notifications (req.user based)
router.get(
  "/notification/my-notifications",
  tokenAuth,
  NotificationController.getMyNotifications,
);
router.get(
  "/notification/unread-count",
  tokenAuth,
  NotificationController.getUnreadCount,
);
router.patch(
  "/notification/mark-as-read/:id",
  tokenAuth,
  NotificationController.markAsRead,
);
router.patch(
  "/notification/mark-all-as-read",
  tokenAuth,
  NotificationController.markAllAsRead,
);

export default router;
