import BookingService from "../services/booking.service";
import { useState, useEffect, useCallback } from "react";
import type { BookingGraphStat } from "../types/booking.type";

const useGraphStat = () => {
  const [bookingStat, setBookingStat] = useState<BookingGraphStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingStat = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const bookingStat = await BookingService.gerStatBookingForGraph();
      setBookingStat(bookingStat.bookingStat);
    } catch (error) {
      console.error(error);
      setError("Failed to load Graph Stat");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookingStat();
  }, [fetchBookingStat]);

  return {
    bookingStat,
    loading,
    error,
  };
};

export default useGraphStat;
