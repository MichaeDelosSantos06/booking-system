import BookingService from "../services/booking.service";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

import type {
  BookingResponseDto,
  BookingStatus,
  BookingCounts,
} from "../types/booking.type";

const useFetchBooking = (status?: BookingStatus, take?: number) => {
  const [bookings, setBookings] = useState<BookingResponseDto[]>([]);
  const [bookingCount, setBookingCount] = useState<BookingCounts | null>(null);
  const [loading, setLoadig] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = useCallback(async () => {
    setLoadig(true);
    setError(null);
    try {
      const result = await BookingService.getAllBookings(status, take);
      setBookings(result.bookings);
      setBookingCount(result.counts);
    } catch (error) {
      console.error(error);
      setError("Failed to load/fetch bookings");
    } finally {
      setLoadig(false);
    }
  }, [status, take]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  return {
    bookings,
    bookingCount,
    loading,
    error,
    refetch: fetchBooking,
  };
};

export default useFetchBooking;
