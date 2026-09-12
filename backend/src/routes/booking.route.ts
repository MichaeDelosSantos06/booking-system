import { Router } from "express";
import { tokenAuth } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validator.js";
import {
  createBookingSchema,
  getBookingSchema,
} from "../schema/booking.schema.js";
import BookingController from "../controllers/booking.controller.js";
import { authorize } from "../middlewares/authorized.js";

const router = Router();

router.post(
  "/booking/create",
  tokenAuth,
  validate(createBookingSchema),
  BookingController.createBooking,
);

router.get(
  "/booking/my-bookings",
  tokenAuth,
  validate(getBookingSchema, "query"),
  BookingController.retrieveAllBookings,
);

router.patch("/booking/cancel/:id", tokenAuth, BookingController.cancelBooking);

router.get(
  "/booking",
  tokenAuth,
  authorize,
  BookingController.retrieveBookingForAdmin,
);

router.get(
  "/booking/dashboard-booking-stat",
  tokenAuth,
  authorize,
  BookingController.getDashboardBookingCount,
);

router.get(
  "/booking/recent-book",
  tokenAuth,
  authorize,
  BookingController.getRecentBookings,
);

router.get(
  "/booking/book-stat",
  tokenAuth,
  authorize,
  BookingController.gerStatBookingForGraph,
);
export default router;
