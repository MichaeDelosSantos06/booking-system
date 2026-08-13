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
    const result = await api.post("/user/me");
    return result.data;
  },

  logoutUser: async () => {
    const result = await api.post("/user/logout");
    return result.data;
  },
};

export default UserService;
