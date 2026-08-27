import type { Request, Response } from "express";
import TrainerService from "../services/trainer.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

import type { CreateTrainerDto } from "../types/trainer.type.js";
import { Status } from "../generated/prisma/enums.js";

const TrainerController = {
  fetchTrainer: asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as Status | undefined;

    const trainers = await TrainerService.fetchTrainer(status);
    return res.status(200).json({
      success: true,
      message: "Trainer Retrieve!",
      trainers,
    });
  }),

  findTrainerById: asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const trainer = await TrainerService.findTrainerById(id);
    return res.status(200).json({
      success: true,
      message: "Trainer Found",
      trainer,
    });
  }),

  createTrainer: asyncHandler(async (req: Request, res: Response) => {
    const data: CreateTrainerDto = req.body;
    const trainer = await TrainerService.createTrainer(data);
    return res.status(201).json({
      success: true,
      message: "Trainer Created Successfully!",
      trainer,
    });
  }),

  updatData: asyncHandler(async (req: Request, res: Response) => {
    const trainerId = Number(req.params.id);
    const data: CreateTrainerDto = req.body;
    await TrainerService.updateData(trainerId, data);
    return res.status(200).json({
      success: true,
      message: "Updated Successfully!",
    });
  }),

  deactivate: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    await TrainerService.deactivate(userId);
    return res.status(200).json({
      success: true,
      message: "Deactivated",
    });
  }),

  activate: asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    await TrainerService.activate(userId);
    return res.status(200).json({
      success: true,
      message: "Activated",
    });
  }),
};

export default TrainerController;
