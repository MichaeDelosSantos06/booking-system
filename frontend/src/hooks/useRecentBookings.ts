import BookingService from "../services/booking.service";
import { useState, useEffect, useCallback } from "react";
import type { RecentBookingResponseDto } from "../types/booking.type";

const useRecentBooking = () => {
  const [recentBook, setRecentBook] = useState<RecentBookingResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentBook = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const recentBook = await BookingService.getRecentBookings();
      setRecentBook(recentBook.recentBook);
    } catch (error) {
      console.error(error);
      setError("Unable to fetch recent bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentBook();
  }, [fetchRecentBook]);

  return {
    recentBook,
    loading,
    error,
    refetch: fetchRecentBook,
  };
};

export default useRecentBooking;
