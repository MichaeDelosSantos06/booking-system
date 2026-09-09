import { useCallback, useEffect, useRef, useState } from "react";

import ClassService from "../services/class.service";

import type {
  ClassCategory,
  ClassDifficulty,
  ClassListResponseDto,
  ClassResponseDto,
} from "../types/class.types";

// The Browse Classes page has no pagination UI, so fetch the whole result
// set. The backend clamps the page size to 50, which is the largest batch
// a single request can return.
const BROWSE_LIMIT = 50;

const useFetchBrowseClasses = () => {
  const [classes, setClasses] = useState<ClassResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ClassCategory | "">("");
  const [difficulty, setDifficulty] = useState<ClassDifficulty | "">("");

  // Keep the latest search + filters always readable without changing the
  // callback identity, so refetch() preserves the active filter set.
  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  const categoryRef = useRef(category);

  useEffect(() => {
    categoryRef.current = category;
  }, [category]);

  const difficultyRef = useRef(difficulty);

  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  // Guard against out-of-order responses — only the latest request applies.
  const requestIdRef = useRef(0);

  // Remember the last successful query so refetch() can repeat it instead of
  // resetting the search/filters.
  const lastParamsRef = useRef({
    search: "",
    category: "" as ClassCategory | "",
    difficulty: "" as ClassDifficulty | "",
  });

  const fetchClasses = useCallback(
    async (
      searchTerm?: string,
      categoryTerm?: ClassCategory | "",
      difficultyTerm?: ClassDifficulty | ""
    ) => {
      const term = searchTerm ?? searchRef.current;
      const categoryFilter = categoryTerm ?? categoryRef.current;
      const difficultyFilter = difficultyTerm ?? difficultyRef.current;

      const requestId = ++requestIdRef.current;

      setError(null);

      try {
        const classData: ClassListResponseDto =
          await ClassService.searchClass({
            search: term,
            page: 1,
            limit: BROWSE_LIMIT,
            status: "Active",
            ...(categoryFilter ? { category: categoryFilter } : {}),
            ...(difficultyFilter ? { difficulty: difficultyFilter } : {}),
          });

        if (requestId !== requestIdRef.current) return;

        lastParamsRef.current = {
          search: term,
          category: categoryFilter,
          difficulty: difficultyFilter,
        };

        setClasses(classData.class);
      } catch (error) {
        console.error(error);

        if (requestId === requestIdRef.current) {
          setError("Failed to load classes.");
        }
      } finally {
        // Loading only reflects the initial fetch, so the grid stays put
        // while searching/filtering instead of flashing a spinner.
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  // Re-issues the last successful query.
  // Keeps current search + filters.
  const refetch = useCallback(async () => {
    await fetchClasses(
      lastParamsRef.current.search,
      lastParamsRef.current.category,
      lastParamsRef.current.difficulty
    );
  }, [fetchClasses]);

  // Load on mount and whenever the search/category/difficulty settles
  // (debounced ~300ms). New filter value always refetches from scratch.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClasses(search, category, difficulty);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, difficulty, fetchClasses]);

  return {
    classes,
    search,
    setSearch,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    loading,
    error,
    fetchClasses,
    refetch,
  };
};

export default useFetchBrowseClasses;