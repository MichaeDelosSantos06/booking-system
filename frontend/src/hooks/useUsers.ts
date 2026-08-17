import UserService from "../services/user.service";
import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "../types/user.type";
import type { Pagination } from "../types/pagination.type";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [weeklyUser, setWeeklyUser] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  // Keep the latest search always readable without changing the callback
  // identity, so page changes preserve the active search.
  const searchRef = useRef(search);
  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  // Guards against out-of-order responses — only the latest request applies.
  const requestIdRef = useRef(0);

  const fetchUsers = useCallback(async (page = 1, searchTerm?: string) => {
    const term = searchTerm ?? searchRef.current;
    const requestId = ++requestIdRef.current;
    setError(null);

    try {
      const result = await UserService.getUsers(page, pagination.limit, term);
      if (requestId !== requestIdRef.current) return;

      setPagination({
        ...result.pagination,
        total: result.user.total,
      });
      setUsers(result.user.users);
    } catch (error) {
      console.error(error);
      if (requestId === requestIdRef.current) {
        setError("Failed to load users.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [pagination.limit]);

  // Weekly new-user count is dashboard data — fetch it once, independently of
  // the member list & search (removed from the per-search request).
  useEffect(() => {
    UserService.getNewUserByWeek()
      .then((count) => setWeeklyUser(count.user))
      .catch((error) => console.error(error));
  }, []);

  // Load on mount and whenever the search settles (debounced). Loading only
  // reflects the initial fetch, so the table stays put while searching instead
  // of flashing a full-page spinner on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(1, search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchUsers]);

  return {
    users,
    weeklyUser,
    pagination,
    search,
    setSearch,
    loading,
    error,
    fetchUsers,
  };
};

export default useUsers;
