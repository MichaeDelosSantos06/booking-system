import { api } from "../api/axios";

const ResetPassword = {
  forgotPassword: async (email: string) => {
    const result = await api.post("/forgot-password", { email });
    return result.data;
  },

  resetPassword: async (token: string, password: string) => {
    const result = await api.post("/reset-password", { token, password });
    return result.data;
  },
};

export default ResetPassword;
