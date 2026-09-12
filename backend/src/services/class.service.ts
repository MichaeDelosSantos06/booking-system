import ClassRepository from "../repositories/class.repositoy.js";
import TrainerRepository from "../repositories/trainer.repositoy.js";
import type {
  CreateClassDto,
  ClassSearchFilters,
  UploadedImage,
} from "../types/class.type.js";
import { AppError } from "../utils/appError.js";
import { uploadImage } from "./cloudinary.service.js";
import { Status } from "../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";
import ScheduleRepository from "../repositories/schedule.repository.js";
import BookingRepository from "../repositories/booking.repository.js";

const ClassService = {
  addClass: async (data: CreateClassDto, image?: UploadedImage) => {
    const trainer = await TrainerRepository.findTrainerById(data.trainerId);
    if (!trainer) {
      throw new AppError("Trainer not found!", 404);
    }

    const className = await ClassRepository.findByClassnName(data.className);
    if (className) {
      throw new AppError("Class already registered", 400);
    }

    if (data.duration >= 300) {
      throw new AppError("Duration cannot exceed 5hrs", 400);
    }

    let imageUrl: string | undefined;
    let imageId: string | undefined;

    if (image) {
      const result = await uploadImage(image.buffer, "fitbook/classes");

      imageUrl = result.secure_url;
      imageId = result.public_id;
    }

    return ClassRepository.addClass(data, imageUrl, imageId);
  },

  fetchClasses: async (status?: Status) => {
    return ClassRepository.fetchClasses(status);
  },

  searchClasses: async (
    page = 1,
    limit = 5,
    search = "",
    filters?: ClassSearchFilters,
  ) => {
    const currentPage = Math.max(1, page);
    const pageSize = Math.min(Math.max(1, limit), 50);
    const searchTerm = search.trim();

    const { classes, total } = await ClassRepository.searchClasses(
      currentPage,
      pageSize,
      searchTerm || undefined,
      filters,
    );

    return {
      classes,
      total,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  deleteDataById: async (id: number) => {
    const checkId = await ClassRepository.findClassById(id);
    if (!checkId) {
      throw new AppError("Class not found", 404);
    }

    return prisma.$transaction(async (tx) => {
      await BookingRepository.updateStatusByClassDelete(tx, id);
      await ScheduleRepository.deleteByClass(tx, id);
      await ClassRepository.deleteDataById(tx, id);
    });
  },

  updateClass: async (
    id: number,
    data: CreateClassDto,
    image?: UploadedImage,
  ) => {
    const checkClass = await ClassRepository.findClassById(id);
    if (!checkClass) {
      throw new AppError("Class not found!", 404);
    }

    const trainer = await TrainerRepository.findTrainerById(data.trainerId);
    if (!trainer) {
      throw new AppError("Triner not found!", 404);
    }

    const checkClassName = await ClassRepository.findClassNameExceptId(
      data.className,
      id,
    );
    if (checkClassName) {
      throw new AppError("Class already exists!", 400);
    }

    if (data.duration >= 300) {
      throw new AppError("Duration cannot exceed 5hrs", 400);
    }

    let imageUrl = checkClass.imageUrl;
    let imageId = checkClass.imageId;

    if (image) {
      const result = await uploadImage(image.buffer, "fitbook/classes");

      imageUrl = result.secure_url;
      imageId = result.public_id;
    }

    return ClassRepository.updateClass(id, data, imageUrl, imageId);
  },

  // Get Inactive Class
  getInactiveClass: async () => {
    return ClassRepository.getInactiveClass();
  },

  // Count Classes
  getActiveClass: async () => {
    return ClassRepository.getActiveClass();
  },
};

export default ClassService;
