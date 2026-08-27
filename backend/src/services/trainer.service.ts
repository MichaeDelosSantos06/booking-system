import TrainerRepository from "../repositories/trainer.repositoy.js";
import { AppError } from "../utils/appError.js";

import type { CreateTrainerDto } from "../types/trainer.type.js";
import { Status } from "../generated/prisma/enums.js";

const TrainerService = {
  fetchTrainer: async (status?: Status) => {
    const trainers = await TrainerRepository.fetchTrainer(status);
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

  createTrainer: async (data: CreateTrainerDto) => {
    const checkEmail = await TrainerRepository.findByEmail(data.email);
    if (checkEmail) {
      throw new AppError("Trainer Already Exist", 400);
    }

    return TrainerRepository.createTrainer(data);
  },

  updateData: async (id: number, data: CreateTrainerDto) => {
    const checkTrainer = await TrainerRepository.findTrainerById(id);
    if (!checkTrainer) {
      throw new AppError("Trainer does't exists", 404);
    }

    return TrainerRepository.updateData(id, data);
  },

  deactivate: async (id: number) => {
    const checkTrainer = await TrainerRepository.findTrainerById(id);
    if (!checkTrainer) {
      throw new AppError("Trainer does't exists", 404);
    }

    return TrainerRepository.deactivate(id);
  },

  activate: async (id: number) => {
    const checkTrainer = await TrainerRepository.findTrainerById(id);
    if (!checkTrainer) {
      throw new AppError("Trainer does't exists", 404);
    }

    return TrainerRepository.activate(id);
  },
};

export default TrainerService;
