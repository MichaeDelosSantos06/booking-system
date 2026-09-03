import { useCallback, useEffect, useRef, useState } from "react";

import ScheduleService from "../services/schedule.service";

import type {
  ScheduleListResponse,
  ScheduleResponseDto,
} from "../types/schedule.type";
import type { Pagination } from "../types/pagination.type";

const DEFAULT_LIMIT = 6;

const useFetchSchedules = () => {
  const [schedule, setSchedule] = useState<ScheduleResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  // Guard against out-of-order responses — only the latest request applies.
  const requestIdRef = useRef(0);

  // Remember the last successful query so refetch() can repeat it after
  // create/delete instead of resetting to page 1.
  const lastParamsRef = useRef({
    page: 1,
    search: "",
  });

  const fetchSchedules = useCallback(async (page = 1, searchTerm?: string) => {
    const term = searchTerm ?? searchRef.current;

    const requestId = ++requestIdRef.current;

    setError(null);

    try {
      const scheduleData: ScheduleListResponse =
        await ScheduleService.searchSchedule({
          search: term,
          page,
          limit: DEFAULT_LIMIT,
        });

      if (requestId !== requestIdRef.current) return;

      lastParamsRef.current = {
        page,
        search: term,
      };

      setSchedule(scheduleData.schedule);
      setPagination(scheduleData.pagination);
    } catch (error) {
      console.error(error);

      if (requestId === requestIdRef.current) {
        setError("Failed to load schedules.");
      }
    } finally {
      // Loading only reflects the initial fetch, so the table stays put
      // while searching/paginating instead of flashing a spinner.
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Re-issues the last successful query.
  // Keeps current search + page.
  const refetch = useCallback(async () => {
    await fetchSchedules(
      lastParamsRef.current.page,
      lastParamsRef.current.search
    );
  }, [fetchSchedules]);

  // Load on mount and whenever the search settles (debounced ~300ms).
  // New search resets to page 1.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSchedules(1, search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchSchedules]);

  return {
    schedule,
    pagination,
    search,
    setSearch,
    loading,
    error,
    fetchSchedules,
    refetch,
  };
};

export default useFetchSchedules;
