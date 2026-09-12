// ui

import Button from "../../../components/ui/Button";

// utils/formatter

import { formatDate, formatTime } from "../../../utils/DateFormatterHelper";

// type/interface

import type { BokingListReponse } from "../../../types/booking.type";

import { locationConfig } from "../../../types/schedule.type";

const BookingList = ({ bookings, loading, onNavigate }: BokingListReponse) => {
  if (loading) {
    return (
      <div className="flex w-full flex-col gap-2.5 sm:gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              h-[78px]
              w-full
              min-w-0
              animate-pulse
              gap-2.5
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              p-2
              sm:h-[86px]
              sm:gap-3
              sm:p-2.5
              lg:h-[90px]
              lg:gap-3.5
            "
          >
            {/* Image Skeleton */}
            <div
              className="
                h-full
                w-[62px]
                shrink-0
                rounded-lg
                bg-gray-200
                sm:w-[70px]
                lg:w-[78px]
              "
            />

            {/* Content Skeleton */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <div className="h-3 w-2/3 max-w-[180px] rounded bg-gray-200 sm:h-3.5" />
              <div className="h-2.5 w-1/2 max-w-[130px] rounded bg-gray-200 sm:h-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="
          flex
          h-[82px]
          w-full
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          sm:h-[90px]
        "
      >
        <div className="min-w-0 text-center">
          <p className="truncate text-[11px] font-semibold text-gray-700 sm:text-xs">
            No recent bookings
          </p>

          <p className="mt-0.5 truncate text-[9px] text-gray-400 sm:text-[10px]">
            Your bookings will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-2.5">
      {bookings.map((booking) => {
        const status = booking.status.toLowerCase();

        const location = locationConfig.find(
          (option) => option.value === booking.schedule.location
        );

        const statusStyles =
          status === "confirmed"
            ? "bg-green-50 text-green-600"
            : status === "completed"
              ? "bg-blue-50 text-blue-600"
              : status === "cancelled"
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-500";

        return (
          <article
            key={booking.id}
            className="
              group
              flex
              h-[82px]
              w-full
              min-w-0
              gap-2.5
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-white
              p-2
              shadow-sm
              transition-all
              duration-200
              hover:border-gray-300
              hover:shadow-md
              sm:h-[88px]
              sm:gap-3
              sm:p-2.5
              lg:h-[92px]
              lg:gap-3.5
            "
          >
            {/* Image */}
            <div
              className="
                h-full
                w-[62px]
                shrink-0
                overflow-hidden
                rounded-lg
                bg-gray-100
                sm:w-[70px]
                lg:w-[78px]
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
                <div className="flex h-full items-center justify-center px-1">
                  <span className="truncate text-[8px] text-gray-400 sm:text-[9px]">
                    No image
                  </span>
                </div>
              )}
            </div>

            {/* Main Information */}
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              {/* Top */}
              <div className="flex min-w-0 items-start justify-between gap-1.5 sm:gap-2">
                <div className="min-w-0 flex-1">
                  <h2
                    className="
                      truncate
                      text-[11px]
                      font-bold
                      text-gray-900
                      sm:text-xs
                      lg:text-sm
                    "
                  >
                    {booking.schedule.class.className}
                  </h2>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[9px]
                      text-gray-400
                      sm:text-[10px]
                      lg:text-[11px]
                    "
                  >
                    {booking.trainer.name}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-1.5
                    py-0.5
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-wide
                    sm:px-2
                    sm:text-[8px]
                    lg:text-[9px]
                    ${statusStyles}
                  `}
                >
                  {booking.status}
                </span>
              </div>

              {/* Bottom Information */}
              <div className="flex min-w-0 items-end justify-between gap-1.5 sm:gap-2">
                <div className="min-w-0 flex-1">
                  <p
                    className="
                      flex
                      min-w-0
                      gap-2
                      truncate
                      text-[8px]
                      text-gray-500
                      sm:gap-3
                      sm:text-[9px]
                      lg:gap-4
                      lg:text-[10px]
                    "
                  >
                    <span className="truncate">
                      {formatDate(booking.schedule.date)}
                    </span>

                    <span className="shrink-0">
                      {formatTime(booking.schedule.startAt)}
                      {" - "}
                      {formatTime(booking.schedule.endAt)}
                    </span>
                  </p>

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
                    {location?.label}
                  </p>
                </div>

                {/* View Button */}
                <Button
                  onClick={() => onNavigate(booking.id)}
                  type="button"
                  className="
                    flex
                    h-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    bg-black
                    px-1.5
                    text-[8px]
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:bg-red-600
                    sm:h-6
                    sm:px-2
                    sm:text-[9px]
                    lg:h-7
                    lg:px-2.5
                  "
                >
                  View
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BookingList;
