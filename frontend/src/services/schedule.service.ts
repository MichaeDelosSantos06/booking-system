import { api } from "../api/axios";
import type {
  CreateScheduleFormData,
  ScheduleSearchParams,
} from "../types/schedule.type";

const ScheduleService = {
  createSchedule: async (data: CreateScheduleFormData) => {
    const result = await api.post("/schedule/create", data);
    return result.data;
  },

  searchSchedule: async (params: ScheduleSearchParams) => {
    const result = await api.get("/schedule/search-schedule", {
      params,
    });

    return result.data;
  },

  deleteSchedule: async (id: number) => {
    const result = await api.post(`/schedule/delete/${id}`);
    return result.data;
  },
};

export default ScheduleService;
