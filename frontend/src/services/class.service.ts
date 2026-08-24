import { api } from "../api/axios";
import type { GetClassesParams } from "../types/class.types";

const ClassService = {
  createClass: async (data: FormData) => {
    const result = await api.post("/class/add-class", data);
    return result.data;
  },

  fetchClasses: async () => {
    const result = await api.get("/class/fetch-class");
    return result.data;
  },

  deleteClassById: async (id: number) => {
    const result = await api.delete(`/class/delete-class/${id}`);
    return result.data;
  },

  updateClass: async (id: number, data: FormData) => {
    const result = await api.patch(`/class/update-class/${id}`, data);
    return result.data;
  },

  searchClass: async (params: GetClassesParams) => {
    const result = await api.get("/class/search-class", {
      params,
    });

    return result.data;
  },
};

export default ClassService;
