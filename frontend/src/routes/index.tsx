import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/auth/LoginPage";
import RegistrationPage from "../page/auth/RegistrationPage";
import AdminLayout from "../components/layout/AdminLayout";
import ForgotPasswordPage from "../page/auth/ForgotPasswordPage";
import ResetPasswordPage from "../page/auth/resetPasswordPage";
import Dashboard from "../page/admin/Dashboard";
import MemberPage from "../page/admin/MembersPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import ClassPage from "../page/admin/ClassesPage";

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
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },

  // Authenticated
  {
    element: <ProtectedRoute />,
    children: [
      // Regular User
      {
        element: <MemberRoute />,
        children: [
          {
            // Member layout
          },
        ],
      },

      // Admin
      {
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
              },
              {
                path: "/members",
                element: <MemberPage />,
              },
              {
                path: "/classes",
                element: <ClassPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
