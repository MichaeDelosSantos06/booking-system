import {
  ChartNoAxesColumnIncreasing,
  BriefcaseBusiness,
  UsersRound,
  CalendarDays,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import Button from "../ui/Button";

import { useAuth } from "../../hooks/useAuth";

const SideBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const adminNavigation = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      to: "/classes",
      label: "Classes",
      icon: BriefcaseBusiness,
    },
    {
      to: "/trainers",
      label: "Trainers",
      icon: UsersRound,
    },
    {
      to: "/schedules",
      label: "Schedule",
      icon: CalendarDays,
    },
    {
      to: "/bookings",
      label: "Bookings",
      icon: ClipboardList,
    },
    {
      to: "/members",
      label: "Members",
      icon: UserRound,
    },
  ];

  const memberNavigation = [
    {
      to: "/member-dashboard",
      label: "Dashboard",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      to: "/browse-classes",
      label: "Classes",
      icon: BriefcaseBusiness,
    },
    {
      to: "/my-bookings",
      label: "Bookings",
      icon: ClipboardList,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: UserRound,
    },
  ];

  const navigation =
    user?.role === "Admin" ? adminNavigation : memberNavigation;

  return (
    <aside className="flex h-full min-h-0 w-[280px] flex-col gap-6 overflow-y-auto bg-black px-1 pt-10 text-white">
      {/* Brand */}
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
              FITNEXT
            </span>

            <p className="font-poppins text-[10px]">
              {user?.role === "Admin" ? "ADMIN PORTAL" : "MEMBER PORTAL"}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
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
      <nav className="px-6 pt-3 font-poppins">
        <div className="mb-4 ml-6 text-xs opacity-50">
          <p>NAVIGATION</p>
        </div>

        <div className="flex flex-col gap-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={20} strokeWidth={1.7} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-auto mb-10 flex flex-col items-center">
        <div className="flex w-[90%] flex-col gap-2">
          <div className="flex justify-center">
            <hr className="w-[90%] border-gray-500/20" />
          </div>

          <Button
            onClick={onLogout}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              pl-7
              font-poppins
              text-white/70
              hover:bg-white/10
              hover:text-white
            "
          >
            <LogOut size={20} strokeWidth={1.7} />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
