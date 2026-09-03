import prisma from "../lib/prisma.js";
import type { UserWhereInput } from "../generated/prisma/models/User.js";

export const UserRepository = {
  registerUser: async (data: {
    name: string;
    email: string;
    contact: string;
    passwordHash: string;
  }) => {
    return prisma.user.create({
      data,
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  updatePassword: async (userId: number, password: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash: password },
    });
  },

  getUsers: async (page: number, limit: number, search?: string) => {
    const skip = (page - 1) * limit;

    const where: UserWhereInput = search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip,
        take: limit,
        where,

        select: {
          id: true,
          name: true,
          email: true,
          contact: true,
          createdAt: true,
          status: true,

          _count: {
            select: {
              bookings: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
    };
  },

  fetchNewUserByWeek: async (startDate: Date, endDate: Date) => {
    return prisma.user.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  },

  getTotalUser: async () => {
    return prisma.user.count({
      where: {
        role: "Member",
      },
    });
  },
};

export default UserRepository;
