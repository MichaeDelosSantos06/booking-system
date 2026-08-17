import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const MemberRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "Member") {
    return <Navigate to="" replace />;
  }

  return <Outlet />;
};

export default MemberRoute;
