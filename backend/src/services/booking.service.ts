import type { BookingStatus } from "../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";
import BookingRepository from "../repositories/booking.repository.js";
import ClassRepository from "../repositories/class.repositoy.js";
import ScheduleRepository from "../repositories/schedule.repository.js";
import TrainerRepository from "../repositories/trainer.repositoy.js";
import UserRepository from "../repositories/user.repository.js";

import type { CreateBookingData } from "../schema/booking.schema.js";
import type { BookingSearchFilters } from "../types/booking.type.js";
import { AppError } from "../utils/appError.js";

const BookingService = {
  createBooking: async (data: CreateBookingData) => {
    const doubleBook = await BookingRepository.checkDoubleBooking(
      data.userId,
      data.scheduleId,
    );
    if (doubleBook) {
      throw new AppError("Double booking not allowed", 400);
    }

    const user = await UserRepository.findById(data.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const checkClass = await ClassRepository.findClassById(data.classId);
    if (!checkClass) {
      throw new AppError("Class not found", 404);
    }

    const trainer = await TrainerRepository.findTrainerById(data.trainerId);
    if (!trainer) {
      throw new AppError("Trainer not found", 404);
    }

    const schedule = await ScheduleRepository.findById(data.scheduleId);
    if (!schedule) {
      throw new AppError("Schedule not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      await ScheduleRepository.updateCapacity(tx, data.scheduleId);
      await BookingRepository.createBooking(tx, data);
    });
  },

  retrieveAllBookings: async (
    userId: number,
    status?: BookingStatus,
    take?: number,
  ) => {
    await BookingRepository.markAsCompleted();

    const bookingsPromise =
      take !== undefined
        ? BookingRepository.retrieveAllBookings(userId, status, take)
        : BookingRepository.retrieveAllBookings(userId, status);

    const [bookings, statusCounts] = await Promise.all([
      bookingsPromise,
      BookingRepository.getBookingCounts(userId),
    ]);

    const counts = {
      all: statusCounts.reduce((total, item) => total + item._count.status, 0),

      confirmed:
        statusCounts.find((item) => item.status === "Confirmed")?._count
          .status ?? 0,

      completed:
        statusCounts.find((item) => item.status === "Completed")?._count
          .status ?? 0,

      cancelled:
        statusCounts.find((item) => item.status === "Cancelled")?._count
          .status ?? 0,
    };

    return {
      bookings,
      counts,
    };
  },

  cancelBooking: async (bookingId: number) => {
    const booking = await BookingRepository.findBookingById(bookingId);
    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    if (booking.status === "Completed" || booking.status === "Cancelled") {
      throw new AppError("Booking Cannot be cancel", 400);
    }

    return BookingRepository.cancelBooking(bookingId);
  },

  retrieveBookingForAdmin: async (
    page = 1,
    limit = 6,
    search = "",
    filters?: BookingSearchFilters,
  ) => {
    const currentPage = Math.max(1, page);
    const pageSize = Math.min(Math.max(1, limit), 50);
    const searchTerm = search.trim();

    await BookingRepository.markAsCompleted();
    const { bookings, total } = await BookingRepository.retrieveBookingForAdmin(
      currentPage,
      pageSize,
      searchTerm || undefined,
      filters,
    );

    return {
      bookings,
      total,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  getDashboardBookingCount: async () => {
    const [todaysBooking, yesterdayBooking] = await Promise.all([
      BookingRepository.getTodaysBooking(),
      BookingRepository.getYesterBooking(),
    ]);

    return {
      todaysBooking,
      yesterdayBooking,
    };
  },

  getRecentBookings: async () => {
    return BookingRepository.getRecentBookings();
  },

  gerStatBookingForGraph: async () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    return BookingRepository.gerStatBookingForGraph(startDate, endDate);
  },

  fetchMyDashboardStatistic: async (userId: number) => {
    const [upcoming, completed, total, membership] = await Promise.all([
      BookingRepository.getMyUpcomingBooking(userId),
      BookingRepository.getMyCompletedBooking(userId),
      BookingRepository.getMyTotalBooking(userId),
      BookingRepository.getMyMembershipStatus(userId),
    ]);

    return {
      upcoming,
      completed,
      total,
      membership,
    };
  },
};

export default BookingService;
