import { createContext } from "react";
import type { CreateUserDto, User } from "../../types/user.type";
import type { LoginDto } from "../../types/user.type";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  registerUser: (data: CreateUserDto) => Promise<void>;
  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
