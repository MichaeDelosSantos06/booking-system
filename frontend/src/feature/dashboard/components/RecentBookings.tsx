import { CalendarDays } from "lucide-react";

import type { RecentActivityProps } from "../../../types/booking.type";

import { formatDate } from "../../../utils/DateFormatterHelper";

const MyRecentBookings = ({ bookings, loading }: RecentActivityProps) => {
  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-2.5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              flex
              h-[58px]
              w-full
              min-w-0
              animate-pulse
              items-center
              gap-2.5
              rounded-xl
              border
              border-gray-200
              bg-white
              p-1.5
              sm:h-[64px]
              sm:gap-3
              sm:p-2
              lg:h-[68px]
            "
          >
            {/* Image Skeleton */}
            <div
              className="
                h-9
                w-9
                shrink-0
                rounded-lg
                bg-gray-200
                sm:h-10
                sm:w-10
                lg:h-11
                lg:w-11
              "
            />

            {/* Information Skeleton */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              <div className="h-2.5 w-28 max-w-[70%] rounded bg-gray-200 sm:h-3 sm:w-32" />

              <div className="h-2 w-20 max-w-[50%] rounded bg-gray-200 sm:h-2.5 sm:w-24" />
            </div>

            {/* Status Skeleton */}
            <div
              className="
                h-5
                w-12
                shrink-0
                rounded-full
                bg-gray-200
                sm:h-6
                sm:w-14
              "
            />
          </div>
        ))}
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <div
        className="
          relative
          flex
          min-h-[150px]
          w-full
          min-w-0
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-6
          text-center
          sm:min-h-[165px]
          sm:px-6
          lg:min-h-[180px]
        "
      >
        {/* Subtle background accent */}
        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-24
            w-24
            rounded-full
            bg-red-50
            blur-xl
            sm:h-28
            sm:w-28
          "
        />

        <div className="relative flex min-w-0 flex-col items-center">
          {/* Icon */}
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-black
              text-white
              shadow-sm
              sm:h-10
              sm:w-10
              lg:h-11
              lg:w-11
            "
          >
            <CalendarDays
              className="
                h-4
                w-4
                sm:h-[17px]
                sm:w-[17px]
                lg:h-[18px]
                lg:w-[18px]
              "
              strokeWidth={2}
            />
          </div>

          {/* Text */}
          <h3
            className="
              mt-3
              truncate
              text-[11px]
              font-semibold
              text-gray-900
              sm:mt-3.5
              sm:text-xs
              lg:text-sm
            "
          >
            No recent activity
          </h3>

          <p
            className="
              mt-1
              max-w-[230px]
              text-[9px]
              leading-4
              text-gray-400
              sm:max-w-[260px]
              sm:text-[10px]
              lg:text-xs
            "
          >
            Your completed and cancelled bookings will appear here.
          </p>

          {/* Accent */}
          <div
            className="
              mt-3
              h-0.5
              w-8
              rounded-full
              bg-red-600
              sm:mt-3.5
              sm:w-9
            "
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-1 sm:gap-2">
      {bookings.map((booking) => {
        const status = booking.status;

        const statusStyle = {
          Confirmed: "border-green-200 bg-green-50 text-green-600",
          Completed: "border-blue-200 bg-blue-50 text-blue-600",
          Cancelled: "border-red-200 bg-red-50 text-red-600",
        }[status];

        return (
          <div
            key={booking.id}
            className="
              group
              flex
              min-h-[58px]
              w-full
              min-w-0
              items-center
              gap-2.5
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              p-1.5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-[.5px]
              hover:border-gray-300
              hover:shadow-md
              sm:min-h-[64px]
              sm:gap-3
              sm:p-2
              lg:min-h-[68px]
              lg:gap-3.5
            "
          >
            {/* Class Image */}
            <div
              className="
                relative
                h-9
                w-9
                shrink-0
                overflow-hidden
                rounded-lg
                bg-gray-100
                sm:h-10
                sm:w-10
                lg:h-11
                lg:w-11
              "
            >
              {booking.schedule.class.imageUrl ? (
                <img
                  src={booking.schedule.class.imageUrl}
                  alt={booking.schedule.class.className}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-gray-100
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-400
                    sm:text-[8px]
                    lg:text-[9px]
                  "
                >
                  Fit
                </div>
              )}
            </div>

            {/* Booking Information */}
            <div className="min-w-0 flex-1">
              <h2
                className="
                  truncate
                  text-[10px]
                  font-semibold
                  text-gray-900
                  sm:text-[11px]
                  lg:text-xs
                "
              >
                {booking.schedule.class.className}
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[8px]
                  text-gray-400
                  sm:text-[9px]
                  lg:text-[10px]
                "
              >
                {formatDate(booking.schedule.date)}
              </p>
            </div>

            {/* Status */}
            <span
              className={`
                shrink-0
                rounded-full
                border
                px-1.5
                py-0.5
                text-[7px]
                font-semibold
                ${statusStyle}
                sm:px-2
                sm:py-1
                sm:text-[8px]
                lg:text-[9px]
              `}
            >
              {status}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MyRecentBookings;
