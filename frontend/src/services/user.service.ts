import { api } from "../api/axios";
import type { LoginDto, CreateUserDto } from "../types/user.type";

const UserService = {
  loginUser: async (data: LoginDto) => {
    const result = await api.post("/user/login", data);
    return result.data;
  },

  registerUser: async (data: CreateUserDto) => {
    const result = await api.post("/user/register", data);
    return result.data;
  },

  getCurrentUser: async () => {
    const result = await api.get("/user/me");
    return result.data;
  },

  logoutUser: async () => {
    const result = await api.post("/user/logout");
    return result.data;
  },

  getUsers: async (page: number, limit: number, search: string) => {
    const result = await api.get("/user/get-users", {
      params: {
        page,
        limit,
        search,
      },
    });
    return result.data;
  },

  getNewUserByWeek: async () => {
    const result = await api.get("/user/get-user-count");
    return result.data;
  },
};

export default UserService;
