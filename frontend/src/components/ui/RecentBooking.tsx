import { Link } from "react-router-dom";
import type { RecentBookingDto } from "../../types/booking.type";
import { timeAgo } from "../../utils/timeAgoFormatter";

const RecentBooking = ({ bookings }: RecentBookingDto) => {
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
        {bookings.map((booking) => (
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
        ))}
      </ul>
    </div>
  );
};

export default RecentBooking;
