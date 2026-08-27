import { api } from "../api/axios";
import type { CreateTrainerFormData } from "../schema/trainer.schema";
import type { Status } from "../types/trainer.type";

const TrainerService = {
  fetchTrainer: async (status?: Status) => {
    const result = await api.get("/trainer/fetch-trainers", {
      params: {
        status,
      },
    });
    return result.data;
  },

  createTrainer: async (data: CreateTrainerFormData) => {
    const result = await api.post("/trainer/create-trainer", data);
    return result.data;
  },

  updateData: async (id: number, data: CreateTrainerFormData) => {
    const result = await api.put(`/trainer/update-trainer-data/${id}`, data);
    return result.data;
  },

  deactivate: async (id: number) => {
    const result = await api.patch(`/trainer/deactivate/${id}`);
    return result.data;
  },

  activate: async (id: number) => {
    const result = await api.patch(`/trainer/activate/${id}`);
    return result.data;
  },
};

export default TrainerService;
