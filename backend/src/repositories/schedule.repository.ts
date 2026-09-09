import prisma from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import type {
  CreateScheduleData,
  ScheduleSearchFilters,
} from "../types/schedule.type.js";
import { Location, ScheduleStat } from "../generated/prisma/enums.js";
import type { ScheduleWhereInput } from "../generated/prisma/models/Schedule.js";

const ScheduleRepository = {
  createSchedule: async (data: CreateScheduleData) => {
    return prisma.schedule.create({
      data: {
        date: data.date,
        startAt: data.startAt,
        endAt: data.endAt,
        location: data.location,
        capacity: data.capacity,

        class: {
          connect: {
            id: data.classId,
          },
        },

        trainer: {
          connect: {
            id: data.trainerId,
          },
        },
      },
    });
  },

  updateExpiredSchedules: async () => {
    return prisma.schedule.updateMany({
      where: {
        deletedAt: null,
        status: "Open",
        endAt: {
          lt: new Date(),
        },
      },
      data: {
        status: ScheduleStat.Past,
      },
    });
  },

  findTrainerScheduleByDate: async (
    trainerId: number,
    startAt: Date,
    endAt: Date,
  ) => {
    return prisma.schedule.findFirst({
      where: {
        deletedAt: null,
        trainerId,
        startAt: {
          lt: endAt,
        },
        endAt: {
          gt: startAt,
        },
      },
      select: {
        id: true,
        trainerId: true,
        date: true,
        startAt: true,
        endAt: true,
      },
    });
  },

  findOverlappingLocationSchedule: async (
    location: Location,
    startAt: Date,
    endAt: Date,
  ) => {
    return prisma.schedule.findFirst({
      where: {
        deletedAt: null,
        location,
        startAt: {
          lt: endAt,
        },
        endAt: {
          gt: startAt,
        },
      },
      select: {
        id: true,
        location: true,
        date: true,
        startAt: true,
        endAt: true,
      },
    });
  },

  getTodaySchedule: async () => {
    // set/get the exact date today in exact time e.g., 12:00 AM
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // get the today's date and add +1 day
    const tommorrow = new Date(today);
    // .getDate() only gets the day of month as a number.
    tommorrow.setDate(tommorrow.getDate() + 1);

    return prisma.schedule.count({
      where: {
        deletedAt: null,
        date: {
          // get the TIMESTAMP in the middle of today's date and less than tomorrow
          gte: today,
          lt: tommorrow,
        },
      },
    });
  },

  searchSchedules: async (
    page: number,
    limit: number,
    search?: string,
    filters?: ScheduleSearchFilters,
  ) => {
    const skip = (page - 1) * limit;

    const orConditions: Exclude<ScheduleWhereInput["OR"], undefined> = [];

    if (search) {
      orConditions.push(
        {
          class: {
            is: {
              className: { contains: search, mode: "insensitive" },
            },
          },
        },
        {
          trainer: {
            is: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
      );
    }

    const where: ScheduleWhereInput = {
      deletedAt: null,
      ...(orConditions.length > 0 ? { OR: orConditions } : {}),
      ...(filters?.status ? { status: filters.status } : {}),
      ...(filters?.location ? { location: filters.location } : {}),
      ...(filters?.fromDate && filters?.toDate
        ? {
            date: {
              gte: filters.fromDate,
              lte: filters.toDate,
            },
          }
        : filters?.fromDate
          ? { date: { gte: filters.fromDate } }
          : filters?.toDate
            ? { date: { lte: filters.toDate } }
            : {}),
    };

    const [schedules, total] = await prisma.$transaction([
      prisma.schedule.findMany({
        skip,
        take: limit,
        where,

        select: {
          id: true,
          location: true,
          startAt: true,
          endAt: true,
          capacity: true,
          status: true,
          date: true,

          class: {
            select: {
              id: true,
              className: true,
              category: true,
            },
          },

          _count: {
            select: {
              bookings: true,
            },
          },

          trainer: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          id: "desc",
        },
      }),

      prisma.schedule.count({ where }),
    ]);

    return {
      schedules,
      total,
    };
  },

  findById: async (id: number) => {
    return prisma.schedule.findUnique({
      where: { id },
    });
  },

  // delete schedule
  deleteById: async (tx: Prisma.TransactionClient, id: number) => {
    return tx.schedule.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  deleteByClass: async (tx: Prisma.TransactionClient, classId: number) => {
    return tx.schedule.updateMany({
      where: {
        classId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },

  getAllSchedule: async () => {
    return prisma.schedule.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        location: true,
        startAt: true,
        endAt: true,
        capacity: true,
        status: true,
        date: true,
        deletedAt: true,

        class: {
          select: {
            id: true,
            className: true,
            category: true,
            imageUrl: true,
            description: true,
            difficulty: true,
            duration: true,
          },
        },

        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  updateCapacity: async (tx: Prisma.TransactionClient, id: number) => {
    return tx.schedule.update({
      where: { id },
      data: {
        capacity: {
          decrement: 1,
        },
      },
    });
  },

  updateSchduleByFull: async () => {
    return prisma.schedule.updateMany({
      where: {
        capacity: 0,
      },
      data: {
        status: ScheduleStat.Full,
      },
    });
  },

  getUpcomingSchedule: async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorow = new Date(today);
    tomorow.setDate(tomorow.getDate() + 1);

    return prisma.schedule.findMany({
      where: {
        deletedAt: null,
        date: {
          gte: today,
          lt: tomorow,
        },
      },
      select: {
        id: true,
        date: true,
        startAt: true,
        endAt: true,
        location: true,
        capacity: true,

        _count: {
          select: {
            bookings: true,
          },
        },

        class: {
          select: {
            className: true,
          },
        },
      },
    });
  },
};

export default ScheduleRepository;
