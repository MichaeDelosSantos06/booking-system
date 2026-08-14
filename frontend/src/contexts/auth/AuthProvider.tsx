import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/user.type";
import UserService from "../../services/user.service";
import type { LoginDto, CreateUserDto } from "../../types/user.type";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const getCurrentUser = async () => {
    const result = await UserService.getCurrentUser();

    setUser(result.user);
  };

  const login = async (data: LoginDto) => {
    await UserService.loginUser(data);
    await getCurrentUser();
  };

  const logout = async () => {
    await UserService.logoutUser();
    setUser(null);
  };

  const registerUser = async (data: CreateUserDto) => {
    await UserService.registerUser(data);
    await getCurrentUser();
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await getCurrentUser();
      } catch {
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        isAuthenticated: user !== null,
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
