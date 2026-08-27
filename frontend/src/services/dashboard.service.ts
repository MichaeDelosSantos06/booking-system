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
};

export default DashboardService;
