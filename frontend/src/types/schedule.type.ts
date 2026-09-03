import { createScheduleSchema } from "../schema/schedule.shema";
import { z } from "zod";

import type { TrainerResponseDto } from "./trainer.type";
import type { ClassResponseDto } from "./class.types";
import type { Pagination } from "./pagination.type";

export interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  trainer: TrainerResponseDto[];
  classes: ClassResponseDto[];
}

type Status = "Open" | "Past";

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>;

export interface ScheduleResponseDto {
  date: string;
  id: number;
  class: {
    className: string;
    category: string;
  };
  trainer: {
    name: string;
  };
  startAt: string;
  endAt: string;
  location: Location;
  capacity: number;
  status: Status;
}

export interface ScheduleSearchParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ScheduleListResponse {
  schedule: ScheduleResponseDto[];
  pagination: Pagination;
}

export interface TablePropsDto {
  schedule: ScheduleResponseDto[] | null;
  onDelete: (id: number) => void;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export interface DeleteSchedModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export type Location =
  | "StudioA"
  | "StudioB"
  | "CyclingStudio"
  | "MainFloor"
  | "WeightRoom"
  | "BoxingRing"
  | "OutdoorCourt";

export const locationConfig = [
  {
    value: "StudioA",
    label: "Studio A",
    className: "bg-green-100 text-green-500",
  },
  {
    value: "StudioB",
    label: "Studio B",
    className: "bg-blue-100 text-blue-500",
  },
  {
    value: "CyclingStudio",
    label: "Cycling Studio",
    className: "bg-purple-100 text-purple-500",
  },
  {
    value: "MainFloor",
    label: "Main Floor",
    className: "bg-orange-100 text-orange-500",
  },
  {
    value: "WeightRoom",
    label: "Weight Room",
    className: "bg-red-100 text-red-500",
  },
  {
    value: "BoxingRing",
    label: "Boxing Ring",
    className: "bg-yellow-100 text-yellow-600",
  },
  {
    value: "OutdoorCourt",
    label: "Outdoor Court",
    className: "bg-emerald-100 text-emerald-500",
  },
] satisfies {
  value: Location;
  label: string;
  className: string;
}[];
