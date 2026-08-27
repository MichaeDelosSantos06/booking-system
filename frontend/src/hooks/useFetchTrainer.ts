import { useCallback, useEffect, useState } from "react";

import TrainerService from "../services/trainer.service";
import type { TrainerResponseDto } from "../types/trainer.type";

import type { Status } from "../types/trainer.type";

const useFetchTrainer = (status?: Status) => {
  const [trainer, setTrainer] = useState<TrainerResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await TrainerService.fetchTrainer(status);

      setTrainer(response.trainers);
    } catch (error) {
      console.error("Failed to fetch trainers:", error);
      setError("Failed to load trainers.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  return {
    trainer,
    error,
    loading,
    refetch: fetchTrainers,
  };
};

export default useFetchTrainer;
