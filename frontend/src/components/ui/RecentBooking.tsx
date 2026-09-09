import { Link } from "react-router-dom";

import type { RecentBookingDto } from "../../types/booking.type";

import { timeAgo } from "../../utils/timeAgoFormatter";

const RecentBooking = ({ bookings, loading }: RecentBookingDto) => {
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
            py-3
            sm:px-5
            sm:py-4
          "
        >
          <div className="min-w-0 flex-1">
            <div className="h-4 w-28 rounded bg-slate-200 sm:h-5 sm:w-32" />

            <div className="mt-1.5 h-2.5 w-36 rounded bg-slate-100 sm:mt-2 sm:h-3 sm:w-44" />
          </div>

          <div className="ml-3 h-3 w-12 shrink-0 rounded bg-slate-100 sm:h-3.5 sm:w-14" />
        </div>

        {/* Booking Skeletons */}
        <ul className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="
                flex
                items-center
                justify-between
                px-4
                py-3
                sm:px-5
                sm:py-4
              "
            >
              {/* Member Skeleton */}
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                {/* Avatar */}
                <div
                  className="
                    h-8
                    w-8
                    shrink-0
                    rounded-full
                    bg-slate-200
                    sm:h-9
                    sm:w-9
                  "
                />

                {/* Details */}
                <div className="min-w-0">
                  <div className="h-3 w-24 rounded bg-slate-200 sm:h-3.5 sm:w-28" />

                  <div className="mt-1.5 h-2.5 w-28 rounded bg-slate-100 sm:mt-2 sm:w-36" />
                </div>
              </div>

              {/* Time Skeleton */}
              <div className="ml-2 h-2.5 w-10 shrink-0 rounded bg-slate-100 sm:ml-3 sm:h-3 sm:w-12" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-poppins shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
            Recent Bookings
          </h1>

          <p className="mt-0.5 truncate text-[10px] text-gray-400 sm:mt-1 sm:text-xs">
            Latest member reservations
          </p>
        </div>

        <Link
          to="/bookings"
          type="button"
          className="ml-3 shrink-0 cursor-pointer text-[10px] font-medium text-red-500 transition-colors hover:text-red-600 sm:text-xs"
        >
          View all
        </Link>
      </div>

      {/* Bookings */}
      <ul className="divide-y divide-gray-100">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li
              key={booking.id}
              className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50 sm:px-5 sm:py-4"
            >
              {/* Member */}
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                {/* Avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-semibold text-red-500 sm:h-9 sm:w-9 sm:text-xs">
                  {booking.user.name.charAt(0)}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <h3 className="truncate text-xs font-medium text-gray-900 sm:text-sm">
                    {booking.user.name}
                  </h3>

                  <span className="block truncate text-[10px] text-gray-400 sm:text-xs">
                    {booking.schedule.class.className}
                  </span>
                </div>
              </div>

              {/* Time */}
              <p className="ml-2 shrink-0 text-[9px] text-gray-400 sm:ml-3 sm:text-[10px]">
                {timeAgo(booking.bookedAt)}
              </p>
            </li>
          ))
        ) : (
          <li className="flex min-h-[180px] items-center justify-center px-4 py-6 sm:min-h-[200px]">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-900 sm:text-sm">
                No recent bookings
              </p>

              <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                There are no recent bookings to display.
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentBooking;
