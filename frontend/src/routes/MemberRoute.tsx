import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const MemberRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "Member") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default MemberRoute;
