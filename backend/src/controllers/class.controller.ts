import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import type { CreateClassDto } from "../types/class.type.js";
import ClassService from "../services/class.service.js";

const ClassController = {
  addClass: asyncHandler(async (req: Request, res: Response) => {
    const data: CreateClassDto = req.body;
    const result = await ClassService.addClass(data, req.file);
    return res.status(201).json({
      success: true,
      message: "Class Created!",
      class: result,
    });
  }),

  fetchClasses: asyncHandler(async (req: Request, res: Response) => {
    const classes = await ClassService.fetchClasses();
    return res.status(200).json({
      success: true,
      message: "Classess Retrieve!",
      class: classes,
    });
  }),
};

export default ClassController;
