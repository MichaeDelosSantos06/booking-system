import { z } from "zod";

export const createScheduleSchema = z
  .object({
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

    location: z
      .union([
        z.literal(""),
        z.enum([
          "StudioA",
          "StudioB",
          "CyclingStudio",
          "MainFloor",
          "WeightRoom",
          "BoxingRing",
          "OutdoorCourt",
        ]),
      ])
      .refine((value) => value !== "", {
        message: "Location is required.",
      }),

    capacity: z.coerce
      .number()
      .int("Capacity must be a whole number.")
      .min(1, "Capacity must be at least 1."),
  })
  .refine(
    (data) =>
      !data.date ||
      !data.startTime ||
      !data.endTime ||
      `${data.date}T${data.endTime}` > `${data.date}T${data.startTime}`,
    {
      message: "End time must be after start time.",
      path: ["endTime"],
    }
  );
