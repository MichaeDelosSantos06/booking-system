import { Link } from "react-router-dom";

import type { UpcomingScheduleData } from "../../types/schedule.type";

import { formatDate, formatTime } from "../../utils/DateFormatterHelper";
import { locationConfig } from "../../types/schedule.type";

const UpcomingClasses = ({ schedules, loading }: UpcomingScheduleData) => {
  if (loading) {
    return (
      <div
        className="
          w-full
          animate-pulse
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          font-poppins
          shadow-sm
        "
        aria-hidden="true"
      >
        {/* Header Skeleton */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            px-4
            py-4
            sm:px-5
            sm:py-5
            lg:px-6
          "
        >
          <div className="min-w-0">
            <div className="h-4 w-32 rounded bg-slate-200 sm:h-5 sm:w-40" />

            <div className="mt-1.5 h-2.5 w-44 rounded bg-slate-100 sm:mt-2 sm:h-3 sm:w-52" />
          </div>

          {/* View All Skeleton */}
          <div className="ml-3 h-6 w-12 shrink-0 rounded-lg bg-slate-100 sm:w-14" />
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-4 py-3 text-left sm:px-5 lg:px-6">
                  <div className="h-2.5 w-12 rounded bg-slate-200" />
                </th>

                <th className="px-4 py-3 text-left sm:px-5 lg:px-6">
                  <div className="h-2.5 w-20 rounded bg-slate-200" />
                </th>

                <th className="px-4 py-3 text-left sm:px-5 lg:px-6">
                  <div className="h-2.5 w-16 rounded bg-slate-200" />
                </th>

                <th className="w-[200px] px-4 py-3 text-left sm:w-[220px] sm:px-5 lg:px-6">
                  <div className="h-2.5 w-12 rounded bg-slate-200" />
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  {/* Class */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <div className="h-3.5 w-28 rounded bg-slate-200 sm:h-4 sm:w-36" />
                  </td>

                  {/* Date & Time */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <div className="h-3 w-20 rounded bg-slate-200 sm:h-3.5 sm:w-24" />

                    <div className="mt-1.5 h-2.5 w-24 rounded bg-slate-100 sm:w-28" />
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <div className="h-6 w-20 rounded-lg bg-slate-100 sm:w-24" />
                  </td>

                  {/* Slots */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <div className="w-full max-w-[220px]">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="h-2.5 w-10 rounded bg-slate-200" />

                        <div className="h-2 w-14 rounded bg-slate-100" />
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 sm:h-2">
                        <div
                          className="h-full rounded-full bg-slate-200"
                          style={{
                            width: `${[35, 60, 45, 75, 50][index]}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-poppins shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="min-w-0">
          <h1 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
            Upcoming Classes
          </h1>

          <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
            Scheduled classes and available slots
          </p>
        </div>

        <Link
          to="/schedules"
          type="button"
          className="ml-3 shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 sm:px-3 sm:text-xs"
        >
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                CLASS
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                DATE & TIME
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                LOCATION
              </th>

              <th className="w-[200px] px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:w-[220px] sm:px-5 lg:px-6">
                SLOTS
              </th>
            </tr>
          </thead>

          <tbody>
            {schedules.length > 0 ? (
              schedules.map((item) => {
                const location = locationConfig.find(
                  (option) => option.value === item.location
                );

                const booked = item._count.bookings ?? 0;

                const remaining = Math.max(item.capacity, 0);

                const maxCapacity = Math.max(item.capacity + booked, 0);

                const currentBooked = Math.min(
                  Math.max(booked, 0),
                  maxCapacity
                );

                const percentage =
                  maxCapacity > 0 ? (currentBooked / maxCapacity) * 100 : 0;

                let progressColor = "bg-slate-300";

                if (currentBooked > 0) {
                  if (percentage < 60) {
                    progressColor = "bg-green-500";
                  } else if (percentage < 85) {
                    progressColor = "bg-orange-500";
                  } else {
                    progressColor = "bg-red-500";
                  }
                }

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/60"
                  >
                    {/* Class */}
                    <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                      <p className="whitespace-nowrap text-xs font-medium text-gray-900 sm:text-sm">
                        {item.class.className}
                      </p>
                    </td>

                    {/* Date & Time */}
                    <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                      <p className="whitespace-nowrap text-[10px] font-medium text-gray-700 sm:text-xs">
                        {formatDate(item.date)}
                      </p>

                      <p className="mt-1 whitespace-nowrap text-[9px] text-gray-400 sm:text-[10px]">
                        {formatTime(item.startAt)} - {formatTime(item.endAt)}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                      <span className="whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1.5 text-[9px] font-medium text-gray-600 sm:px-3 sm:text-[10px]">
                        {location?.label}
                      </span>
                    </td>

                    {/* Slots */}
                    <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                      <div className="w-full max-w-[220px]">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[9px] font-semibold text-gray-700 sm:text-[10px]">
                            {currentBooked}/{maxCapacity}
                          </span>

                          <span className="text-[8px] text-gray-400 sm:text-[9px]">
                            {remaining} {remaining === 1 ? "spot" : "spots"}{" "}
                            left
                          </span>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 sm:h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="flex h-32 items-center justify-center text-xs text-gray-400 sm:h-36">
                    No upcoming classes available
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingClasses;
