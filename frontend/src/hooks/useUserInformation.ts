import UserService from "../services/user.service";
import { useState, useEffect, useCallback } from "react";
import type { ProfileResponseDto } from "../types/user.type";

const useFetchUserInformation = () => {
  const [info, setInfo] = useState<ProfileResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInformation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userInfo = await UserService.getUserInfo();
      setInfo(userInfo.userInfo);
    } catch (error) {
      console.error(error);
      setError("Failed to load user information");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInformation();
  }, [fetchUserInformation]);

  return {
    info,
    loading,
    error,
    refetch: fetchUserInformation,
  };
};

export default useFetchUserInformation;
