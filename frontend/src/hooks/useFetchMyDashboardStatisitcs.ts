import BookingService from "../services/booking.service";
import { useState, useEffect, useCallback } from "react";
import type { DashboardStatResponse } from "../types/booking.type";

const useFetchMyDashboardStatistics = () => {
  const [statistics, setStatistics] = useState<DashboardStatResponse>({
    upcoming: 0,
    completed: 0,
    total: 0,
    membership: {
      status: null,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const statistics = await BookingService.fetchMyDashboardStatistic();

      setStatistics(statistics);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStatistics();
  }, [fetchDashboardStatistics]);

  return {
    statistics,
    loading,
    error,
  };
};

export default useFetchMyDashboardStatistics;
