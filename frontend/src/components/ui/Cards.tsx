import { UsersRound } from "lucide-react";

import useUsers from "../../hooks/useUsers";
import useDashboard from "../../hooks/useDashboard";

const Cards = () => {
  const { weeklyUser, loading: usersLoading } = useUsers();

  const {
    inactive,
    totalClasses,
    totalUser,
    todaySched,
    todayBook,
    loading: dashboardLoading,
  } = useDashboard();

  const loading = usersLoading || dashboardLoading;

  if (loading) {
    return (
      <div
        className="
          grid
          w-full
          grid-cols-2
          gap-3
          pb-4
          font-poppins
          xl:grid-cols-4
        "
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              w-full
              animate-pulse
              flex-col
              gap-2
              rounded-xl
              bg-slate-200
              p-3
              text-white
              sm:p-4
            "
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-slate-300 sm:h-3.5 sm:w-24" />

              <div className="h-[18px] w-[18px] rounded bg-slate-300 sm:h-5 sm:w-5" />
            </div>

            {/* Main Value */}
            <div className="h-6 w-14 rounded-md bg-slate-300 sm:h-7 sm:w-16" />

            {/* Bottom Text */}
            <div className="h-2.5 w-24 rounded bg-slate-300 sm:h-3 sm:w-28" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3 pb-4 font-poppins xl:grid-cols-4">
      {/* Total Members */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Total Members</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{totalUser}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">+{weeklyUser}</span> this
          week
        </p>
      </div>

      {/* Active Classes */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Active Classes</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{totalClasses}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">{inactive}</span> Inactive
        </p>
      </div>

      {/* Today's Classes */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Today's Classes</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{todaySched}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500"></span>
          today's schedule
        </p>
      </div>

      {/* Today's Bookings */}
      <div className="flex w-full flex-col gap-2 rounded-xl bg-black/70 p-3 text-white sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xs sm:text-sm">Today's Bookings</h1>

          <UsersRound size={18} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
        </div>

        <h1 className="text-xl font-semibold sm:text-2xl">{todayBook.today}</h1>

        <p className="text-[9px] sm:text-[11px]">
          <span className="font-bold text-green-500">
            +{todayBook.yesterday}
          </span>{" "}
          from yesterday
        </p>
      </div>
    </div>
  );
};

export default Cards;
