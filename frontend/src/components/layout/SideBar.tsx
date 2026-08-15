import Button from "../ui/Button";
import {
  ChartNoAxesColumnIncreasing,
  BriefcaseBusiness,
  UsersRound,
  CalendarDays,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // logout + navigate
  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex w-[280px] min-h-screen flex-col gap-6 bg-black px-1 pt-10 text-white">
      {/* Heading */}
      <div className="mb-5 flex flex-col items-start px-8">
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e63946]">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
            </svg>
          </div>

          <div className="flex flex-col justify-center leading-2">
            <span
              className="text-xl font-black tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              FITBOOK
            </span>

            <p className="font-poppins text-[10px]">ADMIN PORTAL</p>
          </div>
        </div>
      </div>

      {/* User/Admin Info */}
      <div className="flex justify-center">
        <div className="flex w-[220px] items-center gap-3 rounded-xl bg-gray-500/30 p-2 font-poppins leading-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/40">
            <h1 className="font-semibold text-red-500">
              {user?.name?.trim().charAt(0).toUpperCase()}
            </h1>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate">{user?.name}</h3>

            <p className="truncate text-[10px] opacity-70">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pt-3 font-poppins">
        <div className="mb-4 text-xs opacity-50 ml-6">
          <p>NAVIGATION</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <ChartNoAxesColumnIncreasing size={20} strokeWidth={1.7} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/classes"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <BriefcaseBusiness size={20} strokeWidth={1.7} />
            <span>Classes</span>
          </NavLink>

          <NavLink
            to="/trainers"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <UsersRound size={20} strokeWidth={1.7} />
            <span>Trainers</span>
          </NavLink>

          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <CalendarDays size={20} strokeWidth={1.7} />
            <span>Schedule</span>
          </NavLink>

          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <ClipboardList size={20} strokeWidth={1.7} />
            <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <UserRound size={20} strokeWidth={1.7} />
            <span>Members</span>
          </NavLink>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-auto mb-10 flex justify-center items-center flex-col">
        <div className=" w-[90%] flex flex-col gap-2">
          <div className="flex justify-center">
            <hr className="w-[90%] border-gray-500/20" />
          </div>

          <Button
            onClick={onLogout}
            className="flex cursor-pointer w-full items-center gap-3 rounded-xl pl-7 font-poppins text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={20} strokeWidth={1.7} />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
