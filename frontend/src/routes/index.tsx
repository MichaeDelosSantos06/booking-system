import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/auth/LoginPage";
import RegistrationPage from "../page/auth/RegistrationPage";
import Dashboard from "../page/Dashboard";
import ForgotPasswordPage from "../page/auth/ForgotPasswordPage";
import ResetPasswordPage from "../page/auth/resetPasswordPage";

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
]);
