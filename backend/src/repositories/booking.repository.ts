import prisma from "../../../backend/src/lib/prisma.js";
import {
  BookingStatus,
  Prisma,
} from "../../../backend/src/generated/prisma/client.js";

import type { CreateBookingData } from "../../../backend/src/schema/booking.schema.js";
import type { BookingWhereInput } from "../../../backend/src/generated/prisma/models/Booking.js";
import type {
  BookingSearchFilters,
  BookingsPerDay,
} from "../../../backend/src/types/booking.type.js";

const BookingRepository = {
  createBooking: async (
    tx: Prisma.TransactionClient,
    data: CreateBookingData,
  ) => {
    return tx.booking.create({
      data,
    });
  },

  updateStatusByClassDelete: async (
    tx: Prisma.TransactionClient,
    classId: number,
  ) => {
    return tx.booking.updateMany({
      where: { classId },
      data: {
        status: "Cancelled",
      },
    });
  },

  updateStatusByScheduleDelete: async (
    tx: Prisma.TransactionClient,
    scheduleId: number,
  ) => {
    return tx.booking.updateMany({
      where: { scheduleId },
      data: {
        status: "Cancelled",
      },
    });
  },

  checkDoubleBooking: async (userId: number, scheduleId: number) => {
    return prisma.booking.findUnique({
      where: {
        userId_scheduleId: {
          userId,
          scheduleId,
        },
      },
    });
  },

  // make retrive of bookings for all statuses for the user see of their booking statuses
  retrieveAllBookings: async (
    userId: number,
    status?: BookingStatus,
    take?: number,
  ) => {
    return prisma.booking.findMany({
      where: { userId, ...(status ? { status } : undefined) },
      orderBy: {
        bookedAt: "desc",
      },
      ...(take !== undefined ? { take } : {}),
      select: {
        id: true,
        status: true,
        bookedAt: true,

        trainer: {
          select: {
            name: true,
          },
        },

        schedule: {
          select: {
            startAt: true,
            endAt: true,
            date: true,
            location: true,

            class: {
              select: {
                imageUrl: true,
                className: true,
                description: true,
              },
            },
          },
        },
      },
    });
  },

  getBookingCounts: async (userId: number) => {
    return prisma.booking.groupBy({
      by: ["status"],
      where: { userId },
      _count: {
        status: true,
      },
    });
  },

  cancelBooking: async (bookingId: number) => {
    return prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "Cancelled",
      },
    });
  },

  findBookingById: async (bookingId: number) => {
    return prisma.booking.findUnique({
      where: { id: bookingId },
    });
  },

  markAsCompleted: async () => {
    return prisma.booking.updateMany({
      where: {
        status: BookingStatus.Confirmed,
        schedule: {
          endAt: {
            lt: new Date(),
          },
        },
      },
      data: {
        status: BookingStatus.Completed,
      },
    });
  },

  // retrieve bookings altogether with pagination + search + filters
  retrieveBookingForAdmin: async (
    page: number,
    limit: number,
    search?: string,
    filters?: BookingSearchFilters,
  ) => {
    const skip = (page - 1) * limit;

    const orConditions: NonNullable<BookingWhereInput["OR"]> = [];

    if (search) {
      orConditions.push(
        {
          user: {
            is: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
        {
          user: {
            is: {
              email: { contains: search, mode: "insensitive" },
            },
          },
        },
        {
          schedule: {
            is: {
              class: {
                is: {
                  className: { contains: search, mode: "insensitive" },
                },
              },
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

    const where: BookingWhereInput = {
      ...(orConditions.length > 0 ? { OR: orConditions } : {}),
      ...(filters?.status ? { status: filters.status } : {}),
      ...(filters?.date
        ? {
            schedule: {
              is: {
                date: {
                  gte: filters.date,
                  lt: new Date(filters.date.getTime() + 86_400_000),
                },
              },
            },
          }
        : {}),
    };

    const [bookings, total] = await prisma.$transaction([
      prisma.booking.findMany({
        skip,
        take: limit,
        where,
        select: {
          id: true,
          status: true,

          user: {
            select: {
              name: true,
              email: true,
            },
          },

          schedule: {
            select: {
              date: true,
              startAt: true,
              endAt: true,
              class: {
                select: {
                  className: true,
                },
              },
            },
          },

          trainer: {
            select: {
              status: true,
              name: true,
            },
          },
        },

        orderBy: {
          id: "desc",
        },
      }),

      prisma.booking.count({ where }),
    ]);

    return {
      bookings,
      total,
    };
  },

  getTodaysBooking: async () => {
    // ge the date today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // get the date tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.booking.count({
      where: {
        schedule: {
          deletedAt: null,
        },
        bookedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
  },

  getYesterBooking: async () => {
    // ge the date today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // get the date tomorrow
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return prisma.booking.count({
      where: {
        schedule: {
          deletedAt: null,
        },
        bookedAt: {
          gte: yesterday,
          lt: today,
        },
      },
    });
  },

  getRecentBookings: async () => {
    return prisma.booking.findMany({
      where: {
        schedule: {
          deletedAt: null,
        },
      },
      take: 5,
      orderBy: {
        bookedAt: "desc",
      },
      select: {
        id: true,
        bookedAt: true,

        user: {
          select: {
            name: true,
          },
        },

        schedule: {
          select: {
            class: {
              select: {
                className: true,
              },
            },
          },
        },
      },
    });
  },

  gerStatBookingForGraph: async (
    startDate: Date,
    endDate: Date,
  ): Promise<BookingsPerDay[]> => {
    const result = await prisma.$queryRaw<{ date: Date; total: bigint }[]>`
      SELECT
      days.date,
      COUNT(b.id) AS total
    FROM generate_series(
      ${startDate},
      ${endDate},
      INTERVAL '1 day'
    ) AS days(date)
    LEFT JOIN "Booking" b
      ON DATE(b."bookedAt") = DATE(days.date)
    GROUP BY days.date
    ORDER BY days.date ASC;
    `;

    return result.map((item) => ({
      date: item.date,
      total: Number(item.total),
    }));
  },
};

export default BookingRepository;
