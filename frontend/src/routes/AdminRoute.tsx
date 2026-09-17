import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "Admin") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
