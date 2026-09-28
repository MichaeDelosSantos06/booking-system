import { z } from "zod";
import { createClassSchema } from "../schema/class.schema.js";
import {
  Category,
  Difficulty,
  Location,
  Status,
} from "../generated/prisma/enums.js";

export type CreateClassDto = z.infer<typeof createClassSchema>;

export interface ClassSearchFilters {
  category?: Category;
  difficulty?: Difficulty;
  status?: Status;
}

export interface UploadedImage {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export interface ClassresponseDto {
  id: number;
  className: string;
  description: string;
  category: Category;
  duration: number;
  status: Status;
  imageUrl: string;
  difficulty: Difficulty;
  trainerId: number;

  schedules: {
    id: number;
    date: Date;
    startAt: Date;
    endAt: Date;
    status: Status;
    location: Location;
    capacity: number;

    bookings: {
      id: number;
      userId: number;
    };
  };

  trainer: {
    id: number;
    name: string;
  };
}
