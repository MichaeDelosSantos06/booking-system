import { z } from "zod";
import { Location } from "../generated/prisma/enums.js";

export const createScheduleSchema = z.object({
  classId: z.coerce
    .number()
    .int("Class ID must be a whole number.")
    .min(1, "Class is required."),

  trainerId: z.coerce
    .number()
    .int("Trainer ID must be a whole number.")
    .min(1, "Trainer is required."),

  date: z.string().trim().min(1, "Date is required."),

  startTime: z.string().trim().min(1, "Start time is required."),

  endTime: z.string().trim().min(1, "End time is required."),

  location: z.enum(Location),

  capacity: z.coerce
    .number()
    .int("Capacity must be a whole number.")
    .min(1, "Capacity must be at least 1."),
});
