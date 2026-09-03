import { z } from "zod";
import { createScheduleSchema } from "../schema/schedule.schema.js";
import { Location, ScheduleStat } from "../generated/prisma/enums.js";

export type CreateScheduleDto = z.infer<typeof createScheduleSchema>;

export type CreateScheduleData = {
  date: Date;
  classId: number;
  trainerId: number;
  startAt: Date;
  endAt: Date;
  location: Location;
  capacity: number;
};

export interface ScheduleSearchFilters {
  status?: ScheduleStat;
  location?: Location;
  fromDate?: Date;
  toDate?: Date;
}
