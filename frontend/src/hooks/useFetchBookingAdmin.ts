import BookingService from "../services/booking.service";
import { useState, useEffect, useCallback, useRef } from "react";

import type {
  BookingDataResponseDto,
  BookingStatus,
  BookingsResponseDto,
} from "../types/booking.type";
import type { Pagination } from "../types/pagination.type";

const DEFAULT_LIMIT = 6;

const useFetchAdminBookings = () => {
  const [bookings, setBookings] = useState<BookingsResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatus | "">("");
  const [date, setDate] = useState("");

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });

  // Keep the latest search always readable without changing the callback
  // identity, so page changes preserve the active search.
  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  // Same for the status + date filters, so pagination keeps them applied.
  const statusRef = useRef(status);
  const dateRef = useRef(date);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    dateRef.current = date;
  }, [date]);

  // Guard against out-of-order responses — only the latest request applies.
  const requestIdRef = useRef(0);

  // Remember the last successful query so refetch() can repeat it after
  // create/cancel instead of resetting to page 1.
  const lastParamsRef = useRef({
    page: 1,
    search: "",
    status: "" as BookingStatus | "",
    date: "",
  });

  const fetchBookings = useCallback(
    async (
      page = 1,
      searchTerm?: string,
      statusTerm?: BookingStatus | "",
      dateTerm?: string
    ) => {
      const term = searchTerm ?? searchRef.current;
      const statusFilter = statusTerm ?? statusRef.current;
      const dateFilter = dateTerm ?? dateRef.current;

      const requestId = ++requestIdRef.current;

      setError(null);
      try {
        const bookingData: BookingDataResponseDto =
          await BookingService.retrieveBookingForAdmin({
            search: term,
            page,
            limit: DEFAULT_LIMIT,
            ...(statusFilter ? { status: statusFilter } : {}),
            ...(dateFilter ? { date: dateFilter } : {}),
          });

        if (requestId !== requestIdRef.current) return;

        lastParamsRef.current = {
          page,
          search: term,
          status: statusFilter,
          date: dateFilter,
        };

        setBookings(bookingData.bookings);
        setPagination(bookingData.pagination);
      } catch (error) {
        console.error(error);

        if (requestId === requestIdRef.current) {
          setError("Failed to load bookings.");
        }
      } finally {
        // Loading only reflects the initial fetch, so the table stays put
        // while searching/paginating instead of flashing a spinner.
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  // Re-issues the last successful query.
  // Keeps current search + page + filters.
  const refetch = useCallback(async () => {
    await fetchBookings(
      lastParamsRef.current.page,
      lastParamsRef.current.search,
      lastParamsRef.current.status,
      lastParamsRef.current.date
    );
  }, [fetchBookings]);

  // Load on mount and whenever the search/status/date settles
  // (debounced ~300ms). New filter value resets to page 1.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings(1, search, status, date);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status, date, fetchBookings]);

  return {
    bookings,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    date,
    setDate,
    loading,
    error,
    fetchBookings,
    refetch,
  };
};

export default useFetchAdminBookings;
