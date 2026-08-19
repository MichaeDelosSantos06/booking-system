import TrainerRepository from "../repositories/trainer.repositoy.js";
import { AppError } from "../utils/appError.js";

const TrainerService = {
  fetchTrainer: async () => {
    const trainers = await TrainerRepository.fetchTrainer();
    if (trainers.length === 0) {
      throw new AppError("No Trainer/s Found.", 404);
    }

    return trainers;
  },

  findTrainerById: async (id: number) => {
    const trainer = await TrainerRepository.findTrainerById(id);
    if (!trainer) {
      throw new AppError("No Trainer/s Found.", 404);
    }

    return trainer;
  },
};

export default TrainerService;
