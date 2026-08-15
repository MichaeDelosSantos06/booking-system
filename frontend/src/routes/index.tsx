import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/auth/LoginPage";
import RegistrationPage from "../page/auth/RegistrationPage";
import AdminLayout from "../components/layout/AdminLayout";
import ForgotPasswordPage from "../page/auth/ForgotPasswordPage";
import ResetPasswordPage from "../page/auth/resetPasswordPage";
import Dashboard from "../page/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/regis",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
