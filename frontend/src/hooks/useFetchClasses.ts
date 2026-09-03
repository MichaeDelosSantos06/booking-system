import { useCallback, useEffect, useRef, useState } from "react";

import ClassService from "../services/class.service";

import type { ClassResponseDto, Pagination } from "../types/class.types";

const DEFAULT_LIMIT = 6;

import type { Status } from "../types/trainer.type";

const useFetchClasses = (status?: Status) => {
  const [classes, setClasses] = useState<ClassResponseDto[]>([]);
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
  // create/delete/edit instead of resetting to page 1.
  const lastParamsRef = useRef({
    page: 1,
    search: "",
  });

  const fetchClasses = useCallback(
    async (page = 1, searchTerm?: string) => {
      const term = searchTerm ?? searchRef.current;

      const requestId = ++requestIdRef.current;

      setError(null);

      try {
        const classData = await ClassService.searchClass({
          search: term,
          page,
          limit: DEFAULT_LIMIT,
          ...(status && { status }),
        });

        if (requestId !== requestIdRef.current) return;

        lastParamsRef.current = {
          page,
          search: term,
        };

        setClasses(classData.class);
        setPagination(classData.pagination);
      } catch (error) {
        console.error(error);

        if (requestId === requestIdRef.current) {
          setError("Failed to load classes.");
        }
      } finally {
        // Loading only reflects the initial fetch, so the table stays put
        // while searching/paginating instead of flashing a spinner.
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [status]
  );

  // Re-issues the last successful query.
  // Keeps current search + page + status from the hook argument.
  const refetch = useCallback(async () => {
    await fetchClasses(
      lastParamsRef.current.page,
      lastParamsRef.current.search
    );
  }, [fetchClasses]);

  // Load on mount and whenever the search settles (debounced ~300ms).
  // New search resets to page 1.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClasses(1, search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchClasses]);

  return {
    classes,
    pagination,
    search,
    setSearch,
    loading,
    error,
    fetchClasses,
    refetch,
  };
};

export default useFetchClasses;
