import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CreateScheduleDto } from "../../types/schedule.type.js";

vi.mock("../../repositories/class.repositoy.js", () => ({
  default: { findClassById: vi.fn() },
}));

vi.mock("../../repositories/trainer.repositoy.js", () => ({
  default: { findTrainerById: vi.fn() },
}));

vi.mock("../../repositories/schedule.repository.js", () => ({
  default: {
    findTrainerScheduleByDate: vi.fn(),
    findOverlappingLocationSchedule: vi.fn(),
    createSchedule: vi.fn(),
    getAllSchedule: vi.fn(),
    getTodaySchedule: vi.fn(),
    updateExpiredSchedules: vi.fn(),
    updateSchduleByFull: vi.fn(),
    searchSchedules: vi.fn(),
    findById: vi.fn(),
    findByIdWithClass: vi.fn(),
    deleteById: vi.fn(),
    getUpcomingSchedule: vi.fn(),
  },
}));

vi.mock("../../repositories/booking.repository.js", () => ({
  default: {
    updateStatusByScheduleDelete: vi.fn(),
    findBookedUserIdsBySchedule: vi.fn(),
  },
}));

vi.mock("../../services/notification.service.js", () => ({
  default: {
    notifyNewSchedule: vi.fn(),
    notifyScheduleCancellation: vi.fn(),
  },
}));

vi.mock("../../lib/prisma.js", () => ({
  default: { $transaction: vi.fn() },
}));

import ScheduleService from "../../services/schedule.service.js";
import ClassRepository from "../../repositories/class.repositoy.js";
import TrainerRepository from "../../repositories/trainer.repositoy.js";
import ScheduleRepository from "../../repositories/schedule.repository.js";
import BookingRepository from "../../repositories/booking.repository.js";
import NotificationService from "../../services/notification.service.js";
import prisma from "../../lib/prisma.js";

const transactionMock = prisma.$transaction as unknown as ReturnType<
  typeof vi.fn
>;

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const futureDate = () => formatLocalDate(new Date(Date.now() + 2 * 86_400_000));
const pastDate = () => formatLocalDate(new Date(Date.now() - 2 * 86_400_000));

const validScheduleData: CreateScheduleDto = {
  classId: 10,
  trainerId: 20,
  date: futureDate(),
  startTime: "10:00",
  endTime: "11:00",
  location: "StudioA",
  capacity: 10,
};

const actAsFoundValidEntry = () => {
  vi.mocked(ClassRepository.findClassById).mockResolvedValue({
    id: 10,
  } as never);
  vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({
    id: 20,
  } as never);
  vi.mocked(ScheduleRepository.findTrainerScheduleByDate).mockResolvedValue(
    null,
  );
  vi.mocked(
    ScheduleRepository.findOverlappingLocationSchedule,
  ).mockResolvedValue(null);
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ScheduleService.createSchedule", () => {
  it("should throw a 404 AppError when the class does not exist", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue(null);

    await expect(
      ScheduleService.createSchedule(validScheduleData),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Class not found",
    });

    expect(TrainerRepository.findTrainerById).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({
      id: 10,
    } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(
      ScheduleService.createSchedule(validScheduleData),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer not found",
    });

    expect(ScheduleRepository.findTrainerScheduleByDate).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the trainer already has a conflicting schedule", async () => {
    actAsFoundValidEntry();
    vi.mocked(ScheduleRepository.findTrainerScheduleByDate).mockResolvedValue({
      id: 50,
      trainerId: 20,
    } as never);

    await expect(
      ScheduleService.createSchedule(validScheduleData),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Trainer has schdule on this date",
    });

    expect(
      ScheduleRepository.findOverlappingLocationSchedule,
    ).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the location overlaps another schedule", async () => {
    actAsFoundValidEntry();
    vi.mocked(
      ScheduleRepository.findOverlappingLocationSchedule,
    ).mockResolvedValue({
      id: 51,
      location: "StudioA",
    } as never);

    await expect(
      ScheduleService.createSchedule(validScheduleData),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Location being used by another schedule at the same time",
    });

    expect(ScheduleRepository.createSchedule).not.toHaveBeenCalled();
  });
});

describe("ScheduleService.createSchedule (time validations)", () => {
  it("should throw a 400 AppError when the start time is in the past", async () => {
    actAsFoundValidEntry();

    await expect(
      ScheduleService.createSchedule({
        ...validScheduleData,
        date: pastDate(),
      }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Schedule must be in the future",
    });

    expect(ScheduleRepository.createSchedule).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the end time is before the start time", async () => {
    actAsFoundValidEntry();

    await expect(
      ScheduleService.createSchedule({
        ...validScheduleData,
        startTime: "10:00",
        endTime: "09:00",
      }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "End time must be after start time",
    });

    expect(ScheduleRepository.createSchedule).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the end time equals the start time", async () => {
    actAsFoundValidEntry();

    await expect(
      ScheduleService.createSchedule({
        ...validScheduleData,
        startTime: "10:00",
        endTime: "10:00",
      }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "End time must be after start time",
    });
  });

  it("should create the schedule with parsed date and time bounds", async () => {
    actAsFoundValidEntry();
    vi.mocked(ScheduleRepository.createSchedule).mockResolvedValue({
      id: 1,
    } as never);

    const data = validScheduleData;
    await ScheduleService.createSchedule(data);

    const expectedDate = new Date(`${data.date}T00:00:00`);
    const expectedStart = new Date(`${data.date}T10:00`);
    const expectedEnd = new Date(`${data.date}T11:00`);

    expect(ClassRepository.findClassById).toHaveBeenCalledWith(10);
    expect(TrainerRepository.findTrainerById).toHaveBeenCalledWith(20);
    expect(ScheduleRepository.findTrainerScheduleByDate).toHaveBeenCalledWith(
      20,
      expectedStart,
      expectedEnd,
    );
    expect(
      ScheduleRepository.findOverlappingLocationSchedule,
    ).toHaveBeenCalledWith("StudioA", expectedStart, expectedEnd);
    expect(ScheduleRepository.createSchedule).toHaveBeenCalledWith({
      date: expectedDate,
      classId: 10,
      trainerId: 20,
      startAt: expectedStart,
      endAt: expectedEnd,
      location: "StudioA",
      capacity: 10,
    });
  });
});

describe("ScheduleService.getAllSchedule", () => {
  it("should return all schedules when found", async () => {
    vi.mocked(ScheduleRepository.getAllSchedule).mockResolvedValue([
      { id: 1 },
    ] as never);

    const result = await ScheduleService.getAllSchedule();

    expect(ScheduleRepository.getAllSchedule).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should return an empty array when there are no schedules", async () => {
    vi.mocked(ScheduleRepository.getAllSchedule).mockResolvedValue([]);

    await expect(ScheduleService.getAllSchedule()).resolves.toEqual([]);
  });
});

describe("ScheduleService.getTodaySchedule", () => {
  it("should expire old schedules first, then return today's schedule", async () => {
    vi.mocked(ScheduleRepository.updateExpiredSchedules).mockResolvedValue({
      count: 3,
    } as never);
    vi.mocked(ScheduleRepository.getTodaySchedule).mockResolvedValue([
      { id: 1 },
    ] as never);

    const result = await ScheduleService.getTodaySchedule();

    expect(ScheduleRepository.updateExpiredSchedules).toHaveBeenCalledTimes(1);
    expect(ScheduleRepository.getTodaySchedule).toHaveBeenCalledTimes(1);
    const expireOrder = vi.mocked(ScheduleRepository.updateExpiredSchedules)
      .mock.invocationCallOrder[0] as number;
    const fetchOrder = vi.mocked(ScheduleRepository.getTodaySchedule).mock
      .invocationCallOrder[0] as number;
    expect(expireOrder).toBeLessThan(fetchOrder);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should return a zero count when there are no schedules today", async () => {
    vi.mocked(ScheduleRepository.updateExpiredSchedules).mockResolvedValue({
      count: 0,
    } as never);
    vi.mocked(ScheduleRepository.getTodaySchedule).mockResolvedValue(0);

    const result = await ScheduleService.getTodaySchedule();

    expect(ScheduleRepository.updateExpiredSchedules).toHaveBeenCalledTimes(1);
    expect(result).toBe(0);
  });
});

describe("ScheduleService.searchSchedules", () => {
  it("should use default page, limit, empty search and no filters", async () => {
    vi.mocked(ScheduleRepository.updateSchduleByFull).mockResolvedValue({
      count: 0,
    } as never);
    vi.mocked(ScheduleRepository.searchSchedules).mockResolvedValue({
      schedules: [],
      total: 0,
    } as never);

    const result = await ScheduleService.searchSchedules();

    expect(ScheduleRepository.updateSchduleByFull).toHaveBeenCalledTimes(1);
    expect(ScheduleRepository.searchSchedules).toHaveBeenCalledWith(
      1,
      5,
      undefined,
      undefined,
    );
    expect(result).toEqual({
      schedules: [],
      total: 0,
      pagination: { page: 1, limit: 5, total: 0, totalPages: 0 },
    });
  });

  it("should clamp page and limit, trim the search and forward filters", async () => {
    const filters = {
      status: "Open" as const,
      location: "StudioA" as const,
      fromDate: new Date("2026-09-01T00:00:00.000Z"),
      toDate: new Date("2026-09-30T00:00:00.000Z"),
    };
    vi.mocked(ScheduleRepository.updateSchduleByFull).mockResolvedValue({
      count: 0,
    } as never);
    vi.mocked(ScheduleRepository.searchSchedules).mockResolvedValue({
      schedules: [{ id: 1 }] as never,
      total: 55,
    });

    const result = await ScheduleService.searchSchedules(
      -1,
      200,
      "  spin  ",
      filters,
    );

    expect(ScheduleRepository.searchSchedules).toHaveBeenCalledWith(
      1,
      50,
      "spin",
      filters,
    );
    expect(result.pagination).toEqual({
      page: 1,
      limit: 50,
      total: 55,
      totalPages: 2,
    });
  });

  it("should convert a whitespace-only search into undefined", async () => {
    vi.mocked(ScheduleRepository.updateSchduleByFull).mockResolvedValue({
      count: 0,
    } as never);
    vi.mocked(ScheduleRepository.searchSchedules).mockResolvedValue({
      schedules: [],
      total: 0,
    } as never);

    await ScheduleService.searchSchedules(1, 5, "   ");

    expect(ScheduleRepository.updateSchduleByFull).toHaveBeenCalledTimes(1);
    expect(ScheduleRepository.searchSchedules).toHaveBeenCalledWith(
      1,
      5,
      undefined,
      undefined,
    );
  });
});

describe("ScheduleService.deleteById", () => {
  it("should throw a 404 AppError when the schedule does not exist", async () => {
    vi.mocked(ScheduleRepository.findByIdWithClass).mockResolvedValue(null);

    await expect(ScheduleService.deleteById(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Id not found!",
    });

    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("should soft-delete the schedule and then cancel its bookings inside a transaction", async () => {
    vi.mocked(ScheduleRepository.findByIdWithClass).mockResolvedValue({
      id: 9,
      startAt: new Date("2026-09-16T10:00:00.000Z"),
      class: { className: "Yoga Flow" },
    } as never);
    vi.mocked(BookingRepository.findBookedUserIdsBySchedule).mockResolvedValue([
      1,
      2,
    ] as never);

    const callSequence: string[] = [];
    const fakeTx = {};
    transactionMock.mockImplementation(async (callback) => callback(fakeTx));
    vi.mocked(ScheduleRepository.deleteById).mockImplementation(async () => {
      callSequence.push("delete-schedule");
      return { id: 9, deletedAt: new Date() } as never;
    });
    vi.mocked(
      BookingRepository.updateStatusByScheduleDelete,
    ).mockImplementation(async () => {
      callSequence.push("cancel-bookings");
      return { count: 3 } as never;
    });

    await ScheduleService.deleteById(9);

    expect(ScheduleRepository.findByIdWithClass).toHaveBeenCalledWith(9);
    expect(transactionMock).toHaveBeenCalledTimes(1);
    expect(ScheduleRepository.deleteById).toHaveBeenCalledWith(fakeTx, 9);
    expect(BookingRepository.updateStatusByScheduleDelete).toHaveBeenCalledWith(
      fakeTx,
      9,
    );
    expect(callSequence).toEqual(["delete-schedule", "cancel-bookings"]);
    expect(NotificationService.notifyScheduleCancellation).toHaveBeenCalledWith(
      [1, 2],
      "Yoga Flow",
      new Date("2026-09-16T10:00:00.000Z"),
    );
  });
});

describe("ScheduleService.getUpcomingSchedule", () => {
  it("should return the upcoming schedules from the repository", async () => {
    vi.mocked(ScheduleRepository.getUpcomingSchedule).mockResolvedValue([
      { id: 1 },
    ] as never);

    const result = await ScheduleService.getUpcomingSchedule();

    expect(ScheduleRepository.getUpcomingSchedule).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should return an empty array when there are no upcoming schedules", async () => {
    vi.mocked(ScheduleRepository.getUpcomingSchedule).mockResolvedValue(
      [] as never,
    );

    const result = await ScheduleService.getUpcomingSchedule();

    expect(ScheduleRepository.getUpcomingSchedule).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
