import { api } from "../api/axios";

const TrainerService = {
  fetchTrainer: async () => {
    const result = await api.get("/trainer/fetch-trainers");
    return result.data;
  },
};

export default TrainerService;
