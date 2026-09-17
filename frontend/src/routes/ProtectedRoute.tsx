import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ScreenLoader from "../components/ui/ScreenLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <ScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
