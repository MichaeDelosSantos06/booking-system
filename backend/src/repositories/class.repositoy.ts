import prisma from "../lib/prisma.js";
import type { CreateClassDto } from "../types/class.type.js";

const ClassRepositoy = {
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

  fetchClasses: async () => {
    return prisma.class.findMany({
      select: {
        id: true,
        className: true,
        category: true,
        duration: true,
        status: true,
        imageUrl: true,
        difficulty: true,

        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
};

export default ClassRepositoy;
