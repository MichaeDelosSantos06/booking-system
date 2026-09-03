import type { CreateScheduleDto } from "../types/schedule.type.js";
import type { ScheduleSearchFilters } from "../types/schedule.type.js";
import ClassRepository from "../repositories/class.repositoy.js";
import TrainerRepository from "../repositories/trainer.repositoy.js";
import { AppError } from "../utils/appError.js";
import ScheduleRepository from "../repositories/schedule.repository.js";

const ScheduleService = {
  createSchedule: async (data: CreateScheduleDto) => {
    const dateValue = new Date(`${data.date}T00:00:00`);
    const startAt = new Date(`${data.date}T${data.startTime}`);
    const endAt = new Date(`${data.date}T${data.endTime}`);

    const checkClassId = await ClassRepository.findClassById(data.classId);
    if (!checkClassId) {
      throw new AppError("Class not found", 404);
    }

    const trainer = await TrainerRepository.findTrainerById(data.trainerId);
    if (!trainer) {
      throw new AppError("Trainer not found", 404);
    }

    // check if there is an overlapping schdule for the selected trainer
    const checkTrainerSched =
      await ScheduleRepository.findTrainerScheduleByDate(
        data.trainerId,
        startAt,
        endAt,
      );
    if (checkTrainerSched) {
      throw new AppError("Trainer has schdule on this date", 400);
    }

    // check if the location being use on the same time
    const checkLocation =
      await ScheduleRepository.findOverlappingLocationSchedule(
        data.location,
        startAt,
        endAt,
      );
    if (checkLocation) {
      throw new AppError(
        "Location being used by another schedule at the same time",
        400,
      );
    }

    return ScheduleRepository.createSchedule({
      date: dateValue,
      classId: data.classId,
      trainerId: data.trainerId,
      startAt,
      endAt,
      location: data.location,
      capacity: data.capacity,
    });
  },

  getTodaySchedule: async () => {
    await ScheduleRepository.updateExpiredSchedules();
    const schedule = await ScheduleRepository.getTodaySchedule();
    if (!schedule) {
      throw new AppError("No schedule found", 404);
    }

    return schedule;
  },

  searchSchedules: async (
    page = 1,
    limit = 5,
    search = "",
    filters?: ScheduleSearchFilters,
  ) => {
    const currentPage = Math.max(1, page);
    const pageSize = Math.min(Math.max(1, limit), 50);
    const searchTerm = search.trim();

    const { schedules, total } = await ScheduleRepository.searchSchedules(
      currentPage,
      pageSize,
      searchTerm || undefined,
      filters,
    );

    return {
      schedules,
      total,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  deleteById: async (id: number) => {
    const schedule = await ScheduleRepository.findById(id);
    if (!schedule) {
      throw new AppError("Id not found!", 404);
    }

    return ScheduleRepository.deleteById(id);
  },
};

export default ScheduleService;
