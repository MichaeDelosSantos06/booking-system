import { createContext } from "react";
import type { User } from "../../types/user.type";
import type { LoginDto } from "../../types/user.type";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (data: LoginDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
