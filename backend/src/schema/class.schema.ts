import { z } from "zod";
import { Difficulty, Status, Category } from "../generated/prisma/enums.js";

export const createClassSchema = z.object({
  className: z.string().trim().min(1, "classname is required."),
  description: z.string().trim().min(1, "description isr required."),
  duration: z.coerce.number().int().positive(),

  category: z.enum(Category),
  difficulty: z.enum(Difficulty),
  status: z.enum(Status),

  trainerId: z.coerce.number().int().min(1, "Invalid trainer ID.").positive(),
});
