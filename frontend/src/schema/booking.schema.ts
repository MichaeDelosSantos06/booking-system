import { z } from "zod";

export const createBookingSchema = z.object({
  classId: z.coerce
    .number()
    .int("classId must be an integer")
    .positive("classId must be greater than 0"),

  trainerId: z.coerce
    .number()
    .int("trainerId must be an integer")
    .positive("trainerId must be greater than 0"),

  scheduleId: z.coerce
    .number()
    .int("scheduleId must be an integer")
    .positive("scheduleId must be greater than 0"),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
