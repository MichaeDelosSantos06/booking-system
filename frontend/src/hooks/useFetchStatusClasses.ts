import ClassService from "../services/class.service";
import type { Status } from "../types/trainer.type";

import type { ClassResponseDto } from "../types/class.types";

import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const useFetchActiveClasses = (status?: Status) => {
  const [classes, setClasses] = useState<ClassResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ClassService.fetchClasses(status); // GET /class/fetch-class?status=...
      setClasses(response.classes); // flat array
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setError("Failed to load classes.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return { classes, error, loading, refetch: fetchClasses };
};

export default useFetchActiveClasses;
