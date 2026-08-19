import { useEffect, useState } from "react";
import TrainerService from "../services/trainer.service";
import type { CreateTrainerDto } from "../types/trainer.type";

const useFetchTrainer = () => {
  const [trainer, setTrainer] = useState<CreateTrainerDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await TrainerService.fetchTrainer();

        setTrainer(response.trainer);
      } catch (error) {
        console.error(error);
        setError("Trainer not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return {
    trainer,
    error,
    loading,
  };
};

export default useFetchTrainer;
