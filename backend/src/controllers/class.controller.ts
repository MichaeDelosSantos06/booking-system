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

  deleteClassById: asyncHandler(async (req: Request, res: Response) => {
    const classId = Number(req.params.id);

    await ClassService.deleteDataById(classId);
    return res.status(200).json({
      success: true,
      message: "Delete Successfully",
    });
  }),

  updateClass: asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data: CreateClassDto = req.body;
    await ClassService.updateClass(id, data, req.file);
    return res.status(200).json({
      success: true,
      message: "Update Successfully",
    });
  }),

  searchClasses: asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const result = await ClassService.searchClasses(page, limit, search);

    return res.status(200).json({
      success: true,
      message: "Classes retrieved successfully!",
      class: result.classes,
      pagination: result.pagination,
    });
  }),
};

export default ClassController;
