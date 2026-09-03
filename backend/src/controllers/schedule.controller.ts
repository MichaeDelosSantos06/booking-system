import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import type { CreateScheduleDto } from "../types/schedule.type.js";
import ScheduleService from "../services/schedule.service.js";
import { Location, ScheduleStat } from "../generated/prisma/enums.js";

const ScheduleController = {
  createSchedule: asyncHandler(async (req: Request, res: Response) => {
    const data: CreateScheduleDto = req.body;

    await ScheduleService.createSchedule(data);
    return res.status(201).json({
      success: true,
      message: "Schedule Creatd",
    });
  }),

  getTodaySchedule: asyncHandler(async (req: Request, res: Response) => {
    const schedule = await ScheduleService.getTodaySchedule();
    return res.status(200).json({
      success: true,
      message: "Schedule retrieve",
      schedule,
    });
  }),

  searchSchedules: asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const status = req.query.status as ScheduleStat | undefined;
    const location = req.query.location as Location | undefined;
    const fromDate = req.query.fromDate
      ? new Date(req.query.fromDate as string)
      : undefined;
    const toDate = req.query.toDate
      ? new Date(req.query.toDate as string)
      : undefined;

    const result = await ScheduleService.searchSchedules(page, limit, search, {
      ...(status ? { status } : {}),
      ...(location ? { location } : {}),
      ...(fromDate && !Number.isNaN(fromDate.getTime()) ? { fromDate } : {}),
      ...(toDate && !Number.isNaN(toDate.getTime()) ? { toDate } : {}),
    });

    return res.status(200).json({
      success: true,
      message: "Schedules retrieved successfully!",
      schedule: result.schedules,
      pagination: result.pagination,
    });
  }),

  deleteById: asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await ScheduleService.deleteById(id);
    return res.status(200).json({
      success: true,
      message: "Deleted Successfully!",
    });
  }),
};

export default ScheduleController;
