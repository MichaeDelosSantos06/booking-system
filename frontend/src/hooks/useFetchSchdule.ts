import ScheduleService from "../services/schedule.service";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import type { ScheduleResponseDto } from "../types/schedule.type";

const useFetchSchdule = () => {
  const [schedule, setSchdule] = useState<ScheduleResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchdule = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const schedule = await ScheduleService.getSchedule();
      setSchdule(schedule.schedule);
    } catch (error) {
      console.error(error);
      setError("Faild to load schdule");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchdule();
  }, [fetchSchdule]);

  return {
    schedule,
    loading,
    error,
    refetch: fetchSchdule,
  };
};

export default useFetchSchdule;
