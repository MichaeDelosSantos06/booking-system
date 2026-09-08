import { useCallback, useEffect, useState } from "react";

import DashboardService from "../services/dashboard.service";

const useDashboard = () => {
  const [inactive, setInactive] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [todaySched, setTodaySched] = useState(0);
  const [todayBook, setTodayBook] = useState({
    today: 0,
    yesterday: 0,
  });
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        totalClassesResponse,
        inactiveClassesResponse,
        totalUserResponse,
        todaySchedResponse,
        todayBookResponse,
      ] = await Promise.all([
        DashboardService.getActiveClass(),
        DashboardService.getInactiveClass(),
        DashboardService.getTotalUser(),
        DashboardService.getTodaySchedule(),
        DashboardService.getDashboardBookingCount(),
      ]);

      setTotalClasses(totalClassesResponse.classes);
      setInactive(inactiveClassesResponse.classes);
      setTotalUser(totalUserResponse.totalUser);
      setTodaySched(todaySchedResponse.schedule);
      setTodayBook({
        today: todayBookResponse.todaysBooking.todaysBooking,
        yesterday: todayBookResponse.todaysBooking.yesterdayBooking,
      });
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
    totalUser,
    todaySched,
    todayBook,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useDashboard;
