import type { Request, Response } from "express";
import TrainerService from "../services/trainer.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const TrainerController = {
  fetchTrainer: asyncHandler(async (req: Request, res: Response) => {
    const trainers = await TrainerService.fetchTrainer();
    return res.status(200).json({
      success: true,
      message: "Trainer Retrieve!",
      trainer: trainers,
    });
  }),

  findTrainerById: asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const trainer = await TrainerService.findTrainerById(id);
    return res.status(200).json({
      success: true,
      message: "Trainer Found",
      traine: trainer,
    });
  }),
};

export default TrainerController;
