import prisma from "../lib/prisma.js";

const TrainerRepository = {
  findTrainerById: async (id: number) => {
    return prisma.trainer.findUnique({
      where: { id },
    });
  },

  fetchTrainer: async () => {
    return prisma.trainer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        experience: true,
        specialization: true,
        status: true,
      },
    });
  },
};

export default TrainerRepository;
