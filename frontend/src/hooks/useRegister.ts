import UserService from "../services/user.service";
import type { CreateUserDto } from "../types/user.type";

const useRegister = () => {
  const registerUser = async (data: CreateUserDto) => {
    await UserService.registerUser(data);
  };

  return {
    registerUser,
  };
};

export default useRegister;
