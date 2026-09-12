import { useEffect } from "react";
import Button from "../../../components/ui/Button";
import type { ScheduleListProps } from "../../../types/booking.type";
import { formatDate, formatTime } from "../../../utils/DateFormatterHelper";
import {
  CalendarDays,
  Clock3,
  ImageOff,
  MapPin,
  UserRound,
} from "lucide-react";

const ScheduleList = ({
  bookings,
  loading,
  onCancel,
  highlightedBookingId,
}: ScheduleListProps) => {
  useEffect(() => {
    if (highlightedBookingId == null) return;

    const element = document.getElementById(`booking-${highlightedBookingId}`);

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightedBookingId, bookings]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-xl border border-gray-200 bg-white"
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex h-full min-h-110 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
            <CalendarDays className="h-5 w-5 text-gray-400" />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-gray-900">
            No bookings found
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            There are no bookings in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-2">
      {bookings.map((booking) => {
        const isConfirmed = booking.status === "Confirmed";
        const isHighlighted = highlightedBookingId === booking.id;

        return (
          <div
            key={booking.id}
            id={`booking-${booking.id}`}
            className={`
              group h-36 overflow-hidden rounded-xl
              border bg-white
              shadow-[0_1px_2px_rgba(0,0,0,0.03)]
              transition-all duration-200
              hover:border-gray-300
              hover:shadow-md
              sm:h-36
              md:h-36
              ${isHighlighted ? "border-gray-300 shadow-md" : "border-gray-200"}
            `}
          >
            <div className="flex h-full">
              {/* IMAGE */}
              <div
                className="
                  relative h-full w-28 shrink-0 overflow-hidden
                  bg-gray-100
                  sm:w-36
                  md:w-40
                  lg:w-44
                "
              >
                {booking.schedule.class.imageUrl ? (
                  <img
                    src={booking.schedule.class.imageUrl}
                    alt={booking.schedule.class.className}
                    className={`
                      h-full w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                      ${isHighlighted ? "scale-105" : ""}
                    `}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                      <ImageOff className="h-3.5 w-3.5 text-gray-400" />
                    </div>

                    <span className="mt-1 text-[9px] font-medium text-gray-400">
                      No image
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                {/* TOP */}
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2
                      className="
                        truncate text-xs font-semibold tracking-tight
                        text-gray-900
                        sm:text-sm
                      "
                    >
                      {booking.schedule.class.className}
                    </h2>

                    <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-gray-500 sm:text-xs">
                      <UserRound className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />

                      <span className="truncate">{booking.trainer.name}</span>
                    </div>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`
                      shrink-0 rounded-full border px-2 py-0.5
                      text-[9px] font-semibold
                      sm:px-2.5 sm:text-[10px]
                      ${
                        booking.status === "Confirmed"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : booking.status === "Completed"
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-red-50 text-red-500"
                      }
                    `}
                  >
                    {booking.status === "Confirmed"
                      ? "Upcoming"
                      : booking.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-auto flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-gray-600 sm:gap-x-5 sm:text-xs">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <CalendarDays className="h-3 w-3 shrink-0 text-gray-400 sm:h-3.5 sm:w-3.5" />

                    <span className="truncate">
                      {formatDate(booking.schedule.date)}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-1.5">
                    <Clock3 className="h-3 w-3 shrink-0 text-gray-400 sm:h-3.5 sm:w-3.5" />

                    <span className="truncate">
                      {formatTime(booking.schedule.startAt)} –{" "}
                      {formatTime(booking.schedule.endAt)}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-3 w-3 shrink-0 text-gray-400 sm:h-3.5 sm:w-3.5" />

                    <span className="truncate">
                      {booking.schedule.location}
                    </span>
                  </div>
                </div>

                {/* ACTION */}
                {isConfirmed && (
                  <div className="mt-2 flex justify-end border-t border-gray-100 pt-2">
                    <Button
                      type="button"
                      onClick={() => onCancel(booking.id)}
                      className="
        rounded-md
        border border-gray-800
        bg-black
        px-2.5 py-1
        text-[10px] font-medium text-white
        shadow-sm
        transition-all duration-200

        hover:border-red-500
        hover:bg-red-600
        hover:shadow-[0_0_12px_rgba(239,68,68,0.45)]

        sm:px-3 sm:py-1.5 sm:text-xs
      "
                    >
                      Cancel booking
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;
