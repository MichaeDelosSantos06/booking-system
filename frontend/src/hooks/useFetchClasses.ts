import { useEffect } from "react";
import ClassService from "../services/class.service";
import { useState } from "react";
import type { ClassResponseDto } from "../types/class.types";

const useFetchClasses = () => {
  const [classes, setClasses] = useState<ClassResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const classData = await ClassService.fetchClasses();
        setClasses(classData.class);
        console.log(classData.class);
      } catch (error) {
        console.error(error);
        setError("Class/es no Found.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return {
    classes,
    error,
    loading,
  };
};

export default useFetchClasses;
