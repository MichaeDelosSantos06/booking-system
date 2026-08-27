import { useCallback, useEffect, useState } from "react";

import DashboardService from "../services/dashboard.service";

const useDashboard = () => {
  const [inactive, setInactive] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [totalClassesResponse, inactiveClassesResponse] = await Promise.all(
        [DashboardService.getActiveClass(), DashboardService.getInactiveClass()]
      );

      setTotalClasses(totalClassesResponse.classes);
      setInactive(inactiveClassesResponse.classes);
    } catch (error) {
      console.error(error);
      setError("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    inactive,
    totalClasses,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useDashboard;
