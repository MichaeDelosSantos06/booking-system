import prisma from "../lib/prisma.js";
import type { CreateClassDto } from "../types/class.type.js";
import type { ClassWhereInput } from "../generated/prisma/models/Class.js";
import { Status } from "../generated/prisma/enums.js";

const ClassRepository = {
  addClass: async (
    data: CreateClassDto,
    imageUrl?: string,
    imageId?: string,
  ) => {
    return prisma.class.create({
      data: {
        className: data.className,
        description: data.description,
        duration: data.duration,
        category: data.category,
        difficulty: data.difficulty,
        status: data.status,

        trainer: {
          connect: {
            id: data.trainerId,
          },
        },

        ...(imageUrl && { imageUrl }),
        ...(imageId && { imageId }),
      },
    });
  },

  findByClassnName: async (className: string) => {
    return prisma.class.findFirst({
      where: { className },
    });
  },

  findClassById: async (id: number) => {
    return prisma.class.findUnique({
      where: { id },
    });
  },

  findClassNameExceptId: async (className: string, id: number) => {
    return prisma.class.findFirst({
      where: {
        className,
        NOT: {
          id,
        },
      },
    });
  },

  fetchClasses: async (status?: Status) => {
    return prisma.class.findMany({
      where: { ...(status ? { status } : undefined) },

      select: {
        id: true,
        className: true,
        description: true,
        category: true,
        duration: true,
        status: true,
        imageUrl: true,
        difficulty: true,
        trainerId: true,

        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  searchClasses: async (page: number, limit: number, search?: string) => {
    const skip = (page - 1) * limit;

    const where: ClassWhereInput = search
      ? {
          OR: [
            { className: { contains: search, mode: "insensitive" } },
            {
              trainer: {
                is: {
                  name: { contains: search, mode: "insensitive" },
                },
              },
            },
          ],
        }
      : {};

    const [classes, total] = await prisma.$transaction([
      prisma.class.findMany({
        skip,
        take: limit,
        where,

        select: {
          id: true,
          className: true,
          description: true,
          category: true,
          duration: true,
          status: true,
          imageUrl: true,
          difficulty: true,
          trainerId: true,

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

      prisma.class.count({ where }),
    ]);

    return {
      classes,
      total,
    };
  },

  deleteDataById: async (id: number) => {
    return prisma.class.delete({
      where: { id },
    });
  },

  updateClass: async (
    id: number,
    data: CreateClassDto,
    imageUrl?: string | null,
    imageId?: string | null,
  ) => {
    return prisma.class.update({
      where: { id },
      data: {
        className: data.className,
        description: data.description,
        duration: data.duration,
        category: data.category,
        difficulty: data.difficulty,
        status: data.status,

        trainer: {
          connect: {
            id: data.trainerId,
          },
        },

        ...(imageUrl && { imageUrl }),
        ...(imageId && { imageId }),
      },
    });
  },

  // Get Inactive Class
  getInactiveClass: async () => {
    return prisma.class.count({
      where: {
        status: "Inactive",
      },
    });
  },

  // Get Total Classes
  getActiveClass: async () => {
    return prisma.class.count({
      where: {
        status: "Active",
      },
    });
  },
};

export default ClassRepository;
