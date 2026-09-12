import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import BookingService from "../services/booking.service.js";
import type { BookingStatus } from "../generated/prisma/enums.js";

const BookingController = {
  createBooking: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id);
    const { classId, trainerId, scheduleId } = req.body;
    await BookingService.createBooking({
      userId,
      classId,
      scheduleId,
      trainerId,
    });
    return res.status(200).json({
      success: true,
      message: "Booking Created",
    });
  }),

  retrieveAllBookings: asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as BookingStatus | undefined;
    const take =
      req.query.take !== undefined ? Number(req.query.take) : undefined;

    const userId = Number(req.user?.id);

    const bookings = await BookingService.retrieveAllBookings(
      userId,
      status,
      take,
    );
    return res.status(200).json({
      success: true,
      message: "Bookings Retrieve",
      ...bookings,
    });
  }),

  cancelBooking: asyncHandler(async (req: Request, res: Response) => {
    const bookingId = Number(req.params.id);
    await BookingService.cancelBooking(bookingId);
    return res.status(200).json({
      success: true,
      message: "Booking Cancelled",
    });
  }),

  retrieveBookingForAdmin: asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const status = req.query.status as BookingStatus | undefined;
    const date =
      typeof req.query.date === "string" && req.query.date
        ? new Date(`${req.query.date}T00:00:00`)
        : undefined;

    const result = await BookingService.retrieveBookingForAdmin(
      page,
      limit,
      search,
      {
        ...(status ? { status } : {}),
        ...(date && !Number.isNaN(date.getTime()) ? { date } : {}),
      },
    );
    return res.status(200).json({
      success: true,
      message: "All Bookings Retrieve",
      bookings: result.bookings,
      pagination: result.pagination,
    });
  }),

  getDashboardBookingCount: asyncHandler(
    async (req: Request, res: Response) => {
      const todaysBooking = await BookingService.getDashboardBookingCount();
      return res.status(200).json({
        success: true,
        message: "Dashboard Booking Count retrieve",
        todaysBooking,
      });
    },
  ),

  getRecentBookings: asyncHandler(async (req: Request, res: Response) => {
    const recentBook = await BookingService.getRecentBookings();
    return res.status(200).json({
      success: true,
      message: "Recent Bookings Retrieve",
      recentBook,
    });
  }),

  gerStatBookingForGraph: asyncHandler(async (req: Request, res: Response) => {
    const bookingStat = await BookingService.gerStatBookingForGraph();
    return res.status(200).json({
      success: true,
      message: "Booking GRaph stat retrieve",
      bookingStat,
    });
  }),
};

export default BookingController;
