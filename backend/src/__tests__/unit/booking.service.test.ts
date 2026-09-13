import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../repositories/booking.repository.js", () => ({
  default: {
    checkDoubleBooking: vi.fn(),
    createBooking: vi.fn(),
    markAsCompleted: vi.fn(),
    retrieveAllBookings: vi.fn(),
    getBookingCounts: vi.fn(),
    cancelBooking: vi.fn(),
    findBookingById: vi.fn(),
    retrieveBookingForAdmin: vi.fn(),
    getTodaysBooking: vi.fn(),
    getYesterBooking: vi.fn(),
    getRecentBookings: vi.fn(),
    gerStatBookingForGraph: vi.fn(),
    getMyUpcomingBooking: vi.fn(),
    getMyCompletedBooking: vi.fn(),
    getMyTotalBooking: vi.fn(),
    getMyMembershipStatus: vi.fn(),
  },
}));

vi.mock("../../repositories/user.repository.js", () => ({
  default: { findById: vi.fn() },
}));

vi.mock("../../repositories/class.repositoy.js", () => ({
  default: { findClassById: vi.fn() },
}));

vi.mock("../../repositories/trainer.repositoy.js", () => ({
  default: { findTrainerById: vi.fn() },
}));

vi.mock("../../repositories/schedule.repository.js", () => ({
  default: { findById: vi.fn(), updateCapacity: vi.fn() },
}));

vi.mock("../../lib/prisma.js", () => ({
  default: { $transaction: vi.fn() },
}));

import BookingService from "../../services/booking.service.js";
import BookingRepository from "../../repositories/booking.repository.js";
import UserRepository from "../../repositories/user.repository.js";
import ClassRepository from "../../repositories/class.repositoy.js";
import TrainerRepository from "../../repositories/trainer.repositoy.js";
import ScheduleRepository from "../../repositories/schedule.repository.js";
import prisma from "../../lib/prisma.js";

const transactionMock = prisma.$transaction as unknown as ReturnType<typeof vi.fn>;

const bookingData = { userId: 1, classId: 2, trainerId: 3, scheduleId: 4 };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("BookingService.createBooking", () => {
  it("should throw a 400 AppError when the user already booked that schedule", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue({ id: 10 } as never);

    await expect(BookingService.createBooking(bookingData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Double booking not allowed",
    });

    expect(UserRepository.findById).not.toHaveBeenCalled();
    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the user does not exist", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue(null);
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(BookingService.createBooking(bookingData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });

    expect(ClassRepository.findClassById).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the class does not exist", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue(null);
    vi.mocked(UserRepository.findById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassById).mockResolvedValue(null);

    await expect(BookingService.createBooking(bookingData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Class not found",
    });

    expect(TrainerRepository.findTrainerById).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue(null);
    vi.mocked(UserRepository.findById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 2 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(BookingService.createBooking(bookingData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer not found",
    });

    expect(ScheduleRepository.findById).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the schedule does not exist", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue(null);
    vi.mocked(UserRepository.findById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 2 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 3 } as never);
    vi.mocked(ScheduleRepository.findById).mockResolvedValue(null);

    await expect(BookingService.createBooking(bookingData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Schedule not found",
    });

    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("should decrement capacity and create the booking inside a transaction", async () => {
    vi.mocked(BookingRepository.checkDoubleBooking).mockResolvedValue(null);
    vi.mocked(UserRepository.findById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 2 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 3 } as never);
    vi.mocked(ScheduleRepository.findById).mockResolvedValue({ id: 4 } as never);

    const fakeTx = {};
    transactionMock.mockImplementation(async (callback) => callback(fakeTx));
    vi.mocked(ScheduleRepository.updateCapacity).mockResolvedValue({ id: 4, capacity: 9 } as never);
    vi.mocked(BookingRepository.createBooking).mockResolvedValue({ id: 11 } as never);

    await BookingService.createBooking(bookingData);

    expect(BookingRepository.checkDoubleBooking).toHaveBeenCalledWith(1, 4);
    expect(transactionMock).toHaveBeenCalledTimes(1);
    expect(ScheduleRepository.updateCapacity).toHaveBeenCalledWith(fakeTx, 4);
    expect(BookingRepository.createBooking).toHaveBeenCalledWith(fakeTx, bookingData);
  });
});

describe("BookingService.retrieveAllBookings", () => {
  it("should mark completed bookings, fetch bookings and aggregate counts", async () => {
    vi.mocked(BookingRepository.markAsCompleted).mockResolvedValue({ count: 2 } as never);
    vi.mocked(BookingRepository.retrieveAllBookings).mockResolvedValue([{ id: 1 }] as never);
    vi.mocked(BookingRepository.getBookingCounts).mockResolvedValue([
      { status: "Confirmed", _count: { status: 3 } },
      { status: "Completed", _count: { status: 4 } },
    ] as never);

    const result = await BookingService.retrieveAllBookings(1);

    expect(BookingRepository.markAsCompleted).toHaveBeenCalledTimes(1);
    expect(BookingRepository.retrieveAllBookings).toHaveBeenCalledWith(1, undefined);
    expect(BookingRepository.getBookingCounts).toHaveBeenCalledWith(1);
    expect(result.bookings).toEqual([{ id: 1 }]);
    expect(result.counts).toEqual({ all: 7, confirmed: 3, completed: 4, cancelled: 0 });
  });

  it("should forward the status filter and default missing status counts to 0", async () => {
    vi.mocked(BookingRepository.markAsCompleted).mockResolvedValue({ count: 0 } as never);
    vi.mocked(BookingRepository.retrieveAllBookings).mockResolvedValue([] as never);
    vi.mocked(BookingRepository.getBookingCounts).mockResolvedValue([
      { status: "Cancelled", _count: { status: 2 } },
    ] as never);

    const result = await BookingService.retrieveAllBookings(1, "Completed");

    expect(BookingRepository.retrieveAllBookings).toHaveBeenCalledWith(1, "Completed");
    expect(result.counts).toEqual({ all: 2, confirmed: 0, completed: 0, cancelled: 2 });
  });

  it("should compute counts.all as the sum of every status count", async () => {
    vi.mocked(BookingRepository.markAsCompleted).mockResolvedValue({ count: 0 } as never);
    vi.mocked(BookingRepository.retrieveAllBookings).mockResolvedValue([] as never);
    vi.mocked(BookingRepository.getBookingCounts).mockResolvedValue([
      { status: "Confirmed", _count: { status: 1 } },
      { status: "Completed", _count: { status: 2 } },
      { status: "Cancelled", _count: { status: 3 } },
    ] as never);

    const result = await BookingService.retrieveAllBookings(1);

    expect(result.counts).toEqual({ all: 6, confirmed: 1, completed: 2, cancelled: 3 });
  });

  it("should forward the take limit when provided", async () => {
    vi.mocked(BookingRepository.markAsCompleted).mockResolvedValue({ count: 0 } as never);
    vi.mocked(BookingRepository.retrieveAllBookings).mockResolvedValue([] as never);
    vi.mocked(BookingRepository.getBookingCounts).mockResolvedValue([] as never);

    const result = await BookingService.retrieveAllBookings(1, undefined, 3);

    expect(BookingRepository.retrieveAllBookings).toHaveBeenCalledWith(
      1,
      undefined,
      3,
    );
    expect(result).toEqual({
      bookings: [],
      counts: { all: 0, confirmed: 0, completed: 0, cancelled: 0 },
    });
  });
});

describe("BookingService.cancelBooking", () => {
  it("should throw a 404 AppError when the booking does not exist", async () => {
    vi.mocked(BookingRepository.findBookingById).mockResolvedValue(null);

    await expect(BookingService.cancelBooking(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Booking not found",
    });

    expect(BookingRepository.cancelBooking).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the booking is already completed", async () => {
    vi.mocked(BookingRepository.findBookingById).mockResolvedValue({
      id: 9,
      status: "Completed",
    } as never);

    await expect(BookingService.cancelBooking(9)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Booking Cannot be cancel",
    });

    expect(BookingRepository.cancelBooking).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the booking is already cancelled", async () => {
    vi.mocked(BookingRepository.findBookingById).mockResolvedValue({
      id: 9,
      status: "Cancelled",
    } as never);

    await expect(BookingService.cancelBooking(9)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Booking Cannot be cancel",
    });

    expect(BookingRepository.cancelBooking).not.toHaveBeenCalled();
  });

  it("should cancel a confirmed booking", async () => {
    vi.mocked(BookingRepository.findBookingById).mockResolvedValue({
      id: 9,
      status: "Confirmed",
    } as never);
    vi.mocked(BookingRepository.cancelBooking).mockResolvedValue({
      id: 9,
      status: "Cancelled",
    } as never);

    const result = await BookingService.cancelBooking(9);

    expect(BookingRepository.findBookingById).toHaveBeenCalledWith(9);
    expect(BookingRepository.cancelBooking).toHaveBeenCalledWith(9);
    expect(result).toMatchObject({ status: "Cancelled" });
  });
});

describe("BookingService.retrieveBookingForAdmin", () => {
  it("should use default page, limit, search and no filters", async () => {
    vi.mocked(BookingRepository.retrieveBookingForAdmin).mockResolvedValue({
      bookings: [],
      total: 0,
    } as never);

    const result = await BookingService.retrieveBookingForAdmin();

    expect(BookingRepository.markAsCompleted).toHaveBeenCalledTimes(1);
    expect(BookingRepository.retrieveBookingForAdmin).toHaveBeenCalledWith(
      1,
      6,
      undefined,
      undefined,
    );
    expect(result).toEqual({
      bookings: [],
      total: 0,
      pagination: { page: 1, limit: 6, total: 0, totalPages: 0 },
    });
  });

  it("should clamp page and limit, trim the search and forward filters", async () => {
    const filters = { status: "Confirmed" as const, date: new Date("2026-09-09T00:00:00.000Z") };
    vi.mocked(BookingRepository.retrieveBookingForAdmin).mockResolvedValue({
      bookings: [{ id: 1 }] as never,
      total: 76,
    });

    const result = await BookingService.retrieveBookingForAdmin(-1, 100, "  jane doe ", filters);

    expect(BookingRepository.retrieveBookingForAdmin).toHaveBeenCalledWith(
      1,
      50,
      "jane doe",
      filters,
    );
    expect(result.pagination).toEqual({ page: 1, limit: 50, total: 76, totalPages: 2 });
  });

  it("should convert a whitespace-only search into undefined", async () => {
    vi.mocked(BookingRepository.retrieveBookingForAdmin).mockResolvedValue({
      bookings: [],
      total: 0,
    } as never);

    await BookingService.retrieveBookingForAdmin(1, 6, "   ");

    expect(BookingRepository.retrieveBookingForAdmin).toHaveBeenCalledWith(
      1,
      6,
      undefined,
      undefined,
    );
  });
});

describe("BookingService.getDashboardBookingCount", () => {
  it("should return today's and yesterday's booking counts", async () => {
    vi.mocked(BookingRepository.getTodaysBooking).mockResolvedValue(5);
    vi.mocked(BookingRepository.getYesterBooking).mockResolvedValue(3);

    const result = await BookingService.getDashboardBookingCount();

    expect(BookingRepository.getTodaysBooking).toHaveBeenCalledTimes(1);
    expect(BookingRepository.getYesterBooking).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ todaysBooking: 5, yesterdayBooking: 3 });
  });
});

describe("BookingService.getRecentBookings", () => {
  it("should return the recent bookings from the repository", async () => {
    vi.mocked(BookingRepository.getRecentBookings).mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ] as never);

    const result = await BookingService.getRecentBookings();

    expect(BookingRepository.getRecentBookings).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe("BookingService.gerStatBookingForGraph", () => {
  it("should return the booking statistics grouped for the graph", async () => {
    vi.mocked(BookingRepository.gerStatBookingForGraph).mockResolvedValue([{ bookedAt: "x" }] as never);

    const result = await BookingService.gerStatBookingForGraph();

    expect(BookingRepository.gerStatBookingForGraph).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ bookedAt: "x" }]);
  });

  it("should query the last 7 days (startDate is 6 days before endDate)", async () => {
    vi.mocked(BookingRepository.gerStatBookingForGraph).mockResolvedValue([] as never);

    await BookingService.gerStatBookingForGraph();

    expect(BookingRepository.gerStatBookingForGraph).toHaveBeenCalledTimes(1);
    const [startDate, endDate] = vi.mocked(BookingRepository.gerStatBookingForGraph).mock.calls[0] as [Date, Date];
    expect(startDate).toBeInstanceOf(Date);
    expect(endDate).toBeInstanceOf(Date);
    expect(endDate.getTime() - startDate.getTime()).toBeGreaterThanOrEqual(6 * 24 * 60 * 60 * 1000 - 60_000);
    expect(endDate.getTime() - startDate.getTime()).toBeLessThanOrEqual(6 * 24 * 60 * 60 * 1000 + 60_000);
  });
});

describe("BookingService.fetchMyDashboardStatistic", () => {
  it("should aggregate upcoming, completed, total and membership for the user", async () => {
    vi.mocked(BookingRepository.getMyUpcomingBooking).mockResolvedValue(2 as never);
    vi.mocked(BookingRepository.getMyCompletedBooking).mockResolvedValue(5 as never);
    vi.mocked(BookingRepository.getMyTotalBooking).mockResolvedValue(7 as never);
    vi.mocked(BookingRepository.getMyMembershipStatus).mockResolvedValue({ status: "Active" } as never);

    const result = await BookingService.fetchMyDashboardStatistic(1);

    expect(BookingRepository.getMyUpcomingBooking).toHaveBeenCalledWith(1);
    expect(BookingRepository.getMyCompletedBooking).toHaveBeenCalledWith(1);
    expect(BookingRepository.getMyTotalBooking).toHaveBeenCalledWith(1);
    expect(BookingRepository.getMyMembershipStatus).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      upcoming: 2,
      completed: 5,
      total: 7,
      membership: { status: "Active" },
    });
  });

  it("should return zero counts and null membership when the user has no bookings", async () => {
    vi.mocked(BookingRepository.getMyUpcomingBooking).mockResolvedValue(0 as never);
    vi.mocked(BookingRepository.getMyCompletedBooking).mockResolvedValue(0 as never);
    vi.mocked(BookingRepository.getMyTotalBooking).mockResolvedValue(0 as never);
    vi.mocked(BookingRepository.getMyMembershipStatus).mockResolvedValue(null as never);

    const result = await BookingService.fetchMyDashboardStatistic(9);

    expect(BookingRepository.getMyUpcomingBooking).toHaveBeenCalledWith(9);
    expect(result).toEqual({ upcoming: 0, completed: 0, total: 0, membership: null });
  });
});