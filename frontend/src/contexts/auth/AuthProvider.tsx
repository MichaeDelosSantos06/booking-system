import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/user.type";
import UserService from "../../services/user.service";
import type { LoginDto } from "../../types/user.type";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const login = async (data: LoginDto) => {
    const result = await UserService.loginUser(data);

    setUser(result.data);
  };

  const logout = async () => {
    await UserService.logoutUser();
    setUser(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const result = await UserService.getCurrentUser();

        setUser(result.data);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
