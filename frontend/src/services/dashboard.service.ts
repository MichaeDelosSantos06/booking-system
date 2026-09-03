import { api } from "../api/axios";

const DashboardService = {
  getInactiveClass: async () => {
    const result = await api.get("/class/get-inactive-class");
    return result.data;
  },

  getActiveClass: async () => {
    const result = await api.get("/class/get-active-class");
    return result.data;
  },

  getTotalUser: async () => {
    const result = await api.get("/user/get-total-user");
    return result.data;
  },

  getTodaySchedule: async () => {
    const result = await api.get("/schedule/get-schedule");
    return result.data;
  },
};

export default DashboardService;
