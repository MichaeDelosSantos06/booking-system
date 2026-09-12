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
import TrainerPage from "../page/admin/TrainerPage";
import SchedulePage from "../page/admin/SchedulePage";
import BookingPage from "../page/admin/BookingPage";

// Member
import MemberLayout from "../components/layout/MemberLayout";
import MemberDashboardPage from "../page/member/DashboardPage";
import BrowseClassesPage from "../page/member/BrowseClassesPage";
import ViewSchdulePage from "../page/member/ViewSchedulePage";
import MyBookingPage from "../page/member/MyBookingsPage";
import ProfilePage from "../page/member/ProfilePage";

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
            element: <MemberLayout />,
            children: [
              {
                // Member layout
                path: "/member-dashboard",
                element: <MemberDashboardPage />,
              },
              {
                path: "/browse-classes",
                element: <BrowseClassesPage />,
              },
              {
                path: "/view-schedule",
                element: <ViewSchdulePage />,
              },
              {
                path: "/my-bookings",
                element: <MyBookingPage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
            ],
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
              {
                path: "/trainers",
                element: <TrainerPage />,
              },
              {
                path: "/schedules",
                element: <SchedulePage />,
              },
              {
                path: "/bookings",
                element: <BookingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
