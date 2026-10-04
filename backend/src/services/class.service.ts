import ClassRepository from "../repositories/class.repositoy.js";
import TrainerRepository from "../repositories/trainer.repositoy.js";
import type {
  CreateClassDto,
  ClassSearchFilters,
  UploadedImage,
  ClassresponseDto,
} from "../types/class.type.js";
import { AppError } from "../utils/appError.js";
import { uploadImage } from "./cloudinary.service.js";
import prisma from "../lib/prisma.js";
import ScheduleRepository from "../repositories/schedule.repository.js";
import BookingRepository from "../repositories/booking.repository.js";
import NotificationService from "./notification.service.js";
import redisClient from "../config/redis.js";

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

    const createdClass = await ClassRepository.addClass(
      data,
      imageUrl,
      imageId,
    );

    // notify members that a new class is available
    await NotificationService.notifyNewClass(createdClass.className);

    return createdClass;
  },

  // for user ONLY ACTIVE
  fetchClasses: async () => {
    const cacheKey = "class:list:all";

    const cachedClass = await redisClient.get(cacheKey);
    if (cachedClass !== null) {
      console.log("cached HIT", cachedClass);

      return JSON.parse(cachedClass) as ClassresponseDto[];
    }

    console.log("cached MISS", cachedClass);

    const classes = await ClassRepository.fetchClasses();

    await redisClient.set(cacheKey, JSON.stringify(classes), {
      EX: 60,
    });

    return classes;
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

    const filterKey = JSON.stringify(filters ?? {});

    const cacheKey =
      `class:list:search:${searchTerm}` +
      `:limit:${pageSize}` +
      `:page:${currentPage}` +
      `:filters:${filterKey}`;

    const cachedSearch = await redisClient.get(cacheKey);
    if (cachedSearch !== null) {
      console.log("cache HIT", cachedSearch);

      return JSON.parse(cachedSearch);
    }

    console.log("cache MISS", cachedSearch);

    const { classes, total } = await ClassRepository.searchClasses(
      currentPage,
      pageSize,
      searchTerm || undefined,
      filters,
    );

    const searchFilter = {
      classes,
      total,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };

    redisClient.set(cacheKey, JSON.stringify(searchFilter), {
      EX: 30,
    });
  },

  deleteDataById: async (id: number) => {
    const checkId = await ClassRepository.findClassById(id);
    if (!checkId) {
      throw new AppError("Class not found", 404);
    }

    const updatedClass = await prisma.$transaction(async (tx) => {
      await BookingRepository.updateStatusByClassDelete(tx, id);
      await ScheduleRepository.deleteByClass(tx, id);
      await ClassRepository.deleteDataById(tx, id);
    });

    await redisClient.del(`class:id:${id}`);
    await redisClient.del("class:count:inactive");
    await redisClient.del("class:count:active");
    await redisClient.del("class:list:all");

    return updatedClass;
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

    const updatedClass = ClassRepository.updateClass(
      id,
      data,
      imageUrl,
      imageId,
    );

    await redisClient.del(`class:id:${id}`);
    await redisClient.del("class:count:inactive");
    await redisClient.del("class:count:active");
    await redisClient.del("class:list:all");

    return updatedClass;
  },

  // Get Inactive Class
  getInactiveClass: async () => {
    const cacheKey = "class:count:inactive";

    const cachedClass = await redisClient.get(cacheKey);
    if (cachedClass) {
      console.log("Cached HIT", cachedClass);
      return JSON.parse(cachedClass);
    }

    console.log("cached MISS", cachedClass);

    const inactive = await ClassRepository.getInactiveClass();

    await redisClient.set(cacheKey, JSON.stringify(inactive), {
      EX: 60,
    });

    return inactive;
  },

  // Count Classes
  getActiveClass: async () => {
    const cacheKey = "class:count:active";

    const cachedClass = await redisClient.get(cacheKey);
    if (cachedClass) {
      console.log("cache HIT", cachedClass);

      return JSON.parse(cachedClass);
    }

    console.log("cached MISS", cachedClass);

    const active = await ClassRepository.getActiveClass();

    await redisClient.set(cacheKey, JSON.stringify(active), {
      EX: 60,
    });

    return active;
  },
};

export default ClassService;
