// shared/schemas/trainer.schema.ts

import { z } from "zod";

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

  specialization: z
    .union([
      z.literal(""),
      z.enum([
        "Cardio",
        "Yoga",
        "Strengthtraining",
        "Boxing",
        "ZumbaDance",
        "HIIT",
        "Pilates",
        "CrossFit",
      ]),
    ])
    .refine((value) => value !== "", {
      message: "Specialization is required.",
    }),

  status: z
    .union([z.literal(""), z.enum(["Active", "Inactive"])])
    .refine((value) => value !== "", {
      message: "Status is required.",
    }),
});

export type CreateTrainerFormData = z.infer<typeof createTrainerSchema>;
