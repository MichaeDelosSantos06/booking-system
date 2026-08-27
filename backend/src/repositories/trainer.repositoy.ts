import prisma from "../lib/prisma.js";
import type { CreateTrainerDto } from "../types/trainer.type.js";
import { Status } from "../generated/prisma/enums.js";

const TrainerRepository = {
  findTrainerById: async (id: number) => {
    return prisma.trainer.findUnique({
      where: { id },
    });
  },

  fetchTrainer: async (status?: Status) => {
    return prisma.trainer.findMany({
      where: { ...(status ? { status } : undefined) },

      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        experience: true,
        specialization: true,
        status: true,
      },

      orderBy: {
        status: "asc",
      },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.trainer.findUnique({
      where: { email },
    });
  },

  createTrainer: async (data: CreateTrainerDto) => {
    return prisma.trainer.create({
      data: {
        name: data.name,
        email: data.email,
        contact: data.contact,
        experience: data.experience,
        specialization: data.specialization,
        status: data.status,
      },
    });
  },

  // Update Triner Info
  updateData: async (id: number, data: CreateTrainerDto) => {
    return prisma.trainer.update({
      where: { id },
      data,
    });
  },

  // Deactivate turns status into inActive
  deactivate: async (id: number) => {
    return prisma.trainer.update({
      where: { id },
      data: {
        status: "Inactive",
      },
    });
  },

  // Active
  activate: async (id: number) => {
    return prisma.trainer.update({
      where: { id },
      data: {
        status: "Active",
      },
    });
  },
};

export default TrainerRepository;
