import { z } from "zod";

import { Specialization, Status } from "../generated/prisma/enums.js";

export const createTrainerSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),

  contact: z
    .string()
    .trim()
    .min(1, "Contact number is required.")
    .regex(/^(09\d{9}|\+639\d{9})$/, "Invalid Contact Number."),

  experience: z.coerce
    .number()
    .int("Experience must be a whole number.")
    .min(0, "Experience cannot be negative."),

  specialization: z.enum(Specialization),

  status: z.enum(Status),
});

export const trainerQuerySchema = z.object({
  status: z.enum(["Active", "Inactive"]).optional(),
});
