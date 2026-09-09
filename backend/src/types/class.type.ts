import { z } from "zod";
import { createClassSchema } from "../schema/class.schema.js";
import { Category, Difficulty, Status } from "../generated/prisma/enums.js";

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
