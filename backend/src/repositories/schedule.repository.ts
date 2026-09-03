import prisma from "../lib/prisma.js";
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tommorrow = new Date(today);
    tommorrow.setDate(tommorrow.getDate() + 1);

    return prisma.schedule.count({
      where: {
        createdAt: {
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

  deleteById: async (id: number) => {
    return prisma.schedule.delete({
      where: { id },
    });
  },
};

export default ScheduleRepository;
