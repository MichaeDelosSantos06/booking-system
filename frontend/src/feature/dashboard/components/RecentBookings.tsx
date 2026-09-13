import { CalendarDays } from "lucide-react";

import type { RecentActivityProps } from "../../../types/booking.type";

import { formatDate } from "../../../utils/DateFormatterHelper";

const MyRecentBookings = ({ bookings, loading }: RecentActivityProps) => {
  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-1 sm:gap-1.5 lg:gap-1">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              flex
              h-[50px]
              w-full
              min-w-0
              animate-pulse
              items-center
              gap-2
              rounded-lg
              border
              border-gray-200
              bg-white
              p-1

              sm:h-[56px]
              sm:gap-2.5
              sm:rounded-xl
              sm:p-1.5

              lg:h-[64px]
              lg:gap-3
              lg:p-2
            "
          >
            {/* Image Skeleton */}
            <div
              className="
                h-8
                w-8
                shrink-0
                rounded-md
                bg-gray-200

                sm:h-9
                sm:w-9
                sm:rounded-lg

                lg:h-10
                lg:w-10
              "
            />

            {/* Information Skeleton */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <div
                className="
                  h-2
                  w-24
                  max-w-[70%]
                  rounded
                  bg-gray-200

                  sm:h-2.5
                  sm:w-28

                  lg:h-3
                  lg:w-32
                "
              />

              <div
                className="
                  h-1.5
                  w-16
                  max-w-[50%]
                  rounded
                  bg-gray-200

                  sm:h-2
                  sm:w-20

                  lg:h-2.5
                  lg:w-24
                "
              />
            </div>

            {/* Status Skeleton */}
            <div
              className="
                h-4
                w-10
                shrink-0
                rounded-full
                bg-gray-200

                sm:h-5
                sm:w-12

                lg:h-6
                lg:w-14
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
          min-h-[125px]
          w-full
          min-w-0
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          border
          border-gray-200
          bg-white
          px-3
          py-4
          text-center

          sm:min-h-[145px]
          sm:rounded-xl
          sm:px-5
          sm:py-5

          lg:min-h-[165px]
          lg:px-6
          lg:py-6
        "
      >
        {/* Subtle background accent */}
        <div
          className="
            pointer-events-none
            absolute
            -right-6
            -top-6
            h-20
            w-20
            rounded-full
            bg-red-50
            blur-lg

            sm:-right-7
            sm:-top-7
            sm:h-24
            sm:w-24

            lg:-right-8
            lg:-top-8
            lg:h-28
            lg:w-28
            lg:blur-xl
          "
        />

        <div className="relative flex min-w-0 flex-col items-center">
          {/* Icon */}
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-black
              text-white
              shadow-sm

              sm:h-9
              sm:w-9
              sm:rounded-lg

              lg:h-10
              lg:w-10
              lg:rounded-xl
            "
          >
            <CalendarDays
              className="
                h-3.5
                w-3.5

                sm:h-4
                sm:w-4

                lg:h-[17px]
                lg:w-[17px]
              "
              strokeWidth={2}
            />
          </div>

          {/* Text */}
          <h3
            className="
              mt-2
              truncate
              text-[10px]
              font-semibold
              text-gray-900

              sm:mt-2.5
              sm:text-[11px]

              lg:mt-3
              lg:text-xs
            "
          >
            No recent activity
          </h3>

          <p
            className="
              mt-0.5
              max-w-[200px]
              text-[8px]
              leading-3.5
              text-gray-400

              sm:mt-1
              sm:max-w-[230px]
              sm:text-[9px]

              lg:max-w-[260px]
              lg:text-[10px]
              lg:leading-4
            "
          >
            Your completed and cancelled bookings will appear here.
          </p>

          {/* Accent */}
          <div
            className="
              mt-2
              h-0.5
              w-6
              rounded-full
              bg-red-600

              sm:mt-2.5
              sm:w-8

              lg:mt-3
              lg:w-9
            "
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5 sm:gap-2">
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
              min-h-[44px]
              w-full
              min-w-0
              items-center
              gap-2
              overflow-hidden
              rounded-lg
              border
              border-gray-200
              bg-white
              p-1
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-[.5px]
              hover:border-gray-300
              hover:shadow-md

              sm:min-h-[50px]
              sm:gap-2.5
              sm:rounded-xl
              sm:p-1.5

              lg:min-h-[56px]
              lg:gap-3
              lg:p-2
            "
          >
            {/* Class Image */}
            <div
              className="
                relative
                h-8
                w-8
                shrink-0
                overflow-hidden
                rounded-md
                bg-gray-100

                sm:h-9
                sm:w-9
                sm:rounded-lg

                lg:h-10
                lg:w-10
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
                    text-[6px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-400

                    sm:text-[7px]

                    lg:text-[8px]
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
                  text-[9px]
                  font-semibold
                  leading-tight
                  text-gray-900

                  sm:text-[10px]

                  lg:text-xs
                "
              >
                {booking.schedule.class.className}
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[7px]
                  leading-tight
                  text-gray-400

                  sm:text-[8px]

                  lg:text-[9px]
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
                px-1
                py-0.5
                text-[6px]
                font-semibold
                leading-tight
                ${statusStyle}

                sm:px-1.5
                sm:py-0.5
                sm:text-[7px]

                lg:px-2
                lg:py-0.5
                lg:text-[8px]
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
