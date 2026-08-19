import { api } from "../api/axios";

const ClassService = {
  createClass: async (data: FormData) => {
    const result = await api.post("/class/add-class", data);
    return result.data;
  },

  fetchClasses: async () => {
    const result = await api.get("/class/fetch-class");
    return result.data;
  },
};

export default ClassService;
