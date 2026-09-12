import { z } from "zod";
import { BookingStatus } from "../generated/prisma/enums.js";

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

export const getBookingSchema = z.object({
  status: z.enum(BookingStatus).optional(),

  take: z.coerce
    .number()
    .int("take must be an integer")
    .positive("take must be a positive ")
    .optional(),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;

export interface CreateBookingData extends CreateBookingDto {
  userId: number;
}
