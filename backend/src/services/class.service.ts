import ClassRepositoy from "../repositories/class.repositoy.js";
import TrainerRepository from "../repositories/trainer.repositoy.js";
import type { CreateClassDto, UploadedImage } from "../types/class.type.js";
import { AppError } from "../utils/appError.js";
import { uploadImage } from "./cloudinary.service.js";

const ClassService = {
  addClass: async (data: CreateClassDto, image?: UploadedImage) => {
    const trainer = await TrainerRepository.findTrainerById(data.trainerId);
    if (!trainer) {
      throw new AppError("Trainer not found!", 404);
    }

    const className = await ClassRepositoy.findByClassnName(data.className);
    if (className) {
      throw new AppError("Class already registered", 400);
    }

    if (data.duration > 130) {
      throw new AppError("Class duration canont exceed 2 n'half hrs.", 400);
    }

    let imageUrl: string | undefined;
    let imageId: string | undefined;

    if (image) {
      const result = await uploadImage(image.buffer, "fitbook/classes");

      imageUrl = result.secure_url;
      imageId = result.public_id;
    }

    return ClassRepositoy.addClass(data, imageUrl, imageId);
  },

  fetchClasses: async () => {
    const classes = await ClassRepositoy.fetchClasses();
    if (!classes) {
      throw new AppError("No Classes Found.", 404);
    }

    return classes;
  },
};

export default ClassService;
