import ScheduleService from "../services/schedule.service";
import { useState, useEffect, useCallback } from "react";

import type { UpcomingScheduleResponse } from "../types/schedule.type";

const useUpcomingSchedule = () => {
  const [upcoming, setUpcoming] = useState<UpcomingScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingSchedule = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const upcomingSched = await ScheduleService.getUpcomingSchedule();
      setUpcoming(upcomingSched.upcomingSched);
    } catch (error) {
      console.error(error);
      setError("Failed to load Upcoming Schedule");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingSchedule();
  }, [fetchUpcomingSchedule]);

  return {
    upcoming,
    loading,
    error,
  };
};

export default useUpcomingSchedule;
