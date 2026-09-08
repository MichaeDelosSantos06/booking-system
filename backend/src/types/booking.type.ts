import type { BookingStatus } from "../generated/prisma/enums.js";

export interface BookingSearchFilters {
  status?: BookingStatus;
  date?: Date;
}