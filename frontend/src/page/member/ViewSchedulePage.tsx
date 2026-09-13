import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Dumbbell,
  MapPin,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { formatDate, formatTime } from "../../utils/DateFormatterHelper";
import type { ViewScheduleState } from "../../types/class.types";
import Button from "../../components/ui/Button";
import BookingService from "../../services/booking.service";

import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

const ViewSchedulePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const createBooking = async (
    classId: number,
    trainerId: number,
    scheduleId: number
  ) => {
    await BookingService.createBooking({
      classId,
      trainerId,
      scheduleId,
    });

    toast.success("Booked Successfully!");
  };

  if (!state) {
    return (
      <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden font-poppins">
        {/* Fixed Back Button */}
        <div className="shrink-0 pt-1 sm:pt-1.5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              cursor-pointer
              items-center
              gap-1
              text-[11px]
              font-medium
              text-gray-500
              transition-colors
              hover:text-gray-900

              sm:gap-1.5
              sm:text-xs
            "
          >
            <ArrowLeft size={13} className="sm:size-[14px]" />
            Back to Classes
          </button>
        </div>

        {/* Error Content */}
        <div
          className="
            scrollbar-hide
            min-h-0
            w-full
            min-w-0
            flex-1
            overflow-y-auto
            pt-4

            sm:pt-5
          "
        >
          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              text-center
              shadow-sm

              sm:p-8
            "
          >
            <h1 className="text-sm font-bold text-gray-900 sm:text-base">
              Class not found
            </h1>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              The class information is no longer available.
            </p>

            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-4 sm:mt-5"
            >
              Back to Classes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const {
    schedules,
    imageUrl,
    className,
    category,
    difficulty,
    description,
    duration,
    trainerId,
    classId,
    trainer,
  } = state as ViewScheduleState;

  const formatLocation = (location: string) => {
    return location
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  };

  return (
    <div
      className="
        flex
        h-full
        w-full
        min-w-0
        min-h-0
        flex-1
        flex-col
        overflow-hidden
        font-poppins
      "
    >
      {/* ============================================================
          FIXED BACK BUTTON
      ============================================================ */}
      <div className="mt-1 shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            inline-flex
            cursor-pointer
            items-center
            gap-1
            text-[11px]
            font-medium
            text-gray-500
            transition-colors
            hover:text-gray-900

            sm:gap-1.5
            sm:text-xs
          "
        >
          <ArrowLeft size={13} className="sm:size-[14px]" />
          Back to Classes
        </button>
      </div>

      {/* ============================================================
          ENTIRE PAGE CONTENT SCROLLS
      ============================================================ */}
      <div
        className="
          scrollbar-hide
          mt-2
          min-h-0
          flex-1
          overflow-y-auto
          pb-6
          pt-4

          sm:mt-3
          sm:pt-5
          sm:pb-8
        "
      >
        {/* ============================================================
            CLASS HEADER
        ============================================================ */}
        <section
          className="
            overflow-hidden
            rounded-lg
            border
            border-gray-200
            bg-white
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]

            sm:rounded-xl
          "
        >
          {/* Hero */}
          <div
            className="
              relative
              h-40
              overflow-hidden

              sm:h-48

              md:h-52

              lg:h-56
            "
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={className}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <Dumbbell
                  size={32}
                  strokeWidth={1.5}
                  className="text-gray-300 sm:size-10"
                />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Hero Content */}
            <div
              className="
                absolute
                bottom-4
                left-4
                right-4

                sm:bottom-5
                sm:left-5
                sm:right-5

                md:left-6
                md:right-6
              "
            >
              <div className="mb-1.5 flex flex-wrap gap-1 sm:mb-2 sm:gap-1.5">
                <span
                  className="
                    rounded-full
                    bg-white
                    px-2
                    py-0.5
                    text-[8px]
                    font-bold
                    text-gray-800
                    shadow-sm

                    sm:px-2.5
                    sm:py-1
                    sm:text-[9px]
                  "
                >
                  {category}
                </span>

                <span
                  className="
                    rounded-full
                    bg-white
                    px-2
                    py-0.5
                    text-[8px]
                    font-bold
                    text-gray-800
                    shadow-sm

                    sm:px-2.5
                    sm:py-1
                    sm:text-[9px]
                  "
                >
                  {difficulty}
                </span>
              </div>

              <h1
                className="
                  text-xl
                  font-extrabold
                  tracking-tight
                  text-white

                  sm:text-2xl

                  md:text-3xl
                "
              >
                {className}
              </h1>
            </div>
          </div>

          {/* Class Details */}
          <div className="px-4 py-4 sm:px-5 sm:py-5 md:px-6">
            <p
              className="
                max-w-5xl
                text-[11px]
                leading-5
                text-gray-600

                sm:text-xs
                sm:leading-6
              "
            >
              {description}
            </p>

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-2

                sm:mt-5
                sm:gap-2.5

                md:grid-cols-4
              "
            >
              {/* Trainer */}
              <div
                className="
                  min-w-0
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50/80
                  px-2.5
                  py-2.5

                  sm:px-3
                  sm:py-3
                "
              >
                <div className="mb-1 flex items-center gap-1 text-gray-400 sm:mb-1.5 sm:gap-1.5">
                  <UserRound size={12} className="sm:size-[13px]" />

                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">
                    Trainer
                  </span>
                </div>

                <p className="truncate text-[11px] font-bold text-gray-900 sm:text-xs">
                  {trainer}
                </p>
              </div>

              {/* Duration */}
              <div
                className="
                  min-w-0
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50/80
                  px-2.5
                  py-2.5

                  sm:px-3
                  sm:py-3
                "
              >
                <div className="mb-1 flex items-center gap-1 text-gray-400 sm:mb-1.5 sm:gap-1.5">
                  <Clock3 size={12} className="sm:size-[13px]" />

                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">
                    Duration
                  </span>
                </div>

                <p className="text-[11px] font-bold text-gray-900 sm:text-xs">
                  {duration} min
                </p>
              </div>

              {/* Difficulty */}
              <div
                className="
                  min-w-0
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50/80
                  px-2.5
                  py-2.5

                  sm:px-3
                  sm:py-3
                "
              >
                <div className="mb-1 flex items-center gap-1 text-gray-400 sm:mb-1.5 sm:gap-1.5">
                  <Dumbbell size={12} className="sm:size-[13px]" />

                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">
                    Difficulty
                  </span>
                </div>

                <p className="truncate text-[11px] font-bold text-gray-900 sm:text-xs">
                  {difficulty}
                </p>
              </div>

              {/* Category */}
              <div
                className="
                  min-w-0
                  rounded-lg
                  border
                  border-gray-100
                  bg-gray-50/80
                  px-2.5
                  py-2.5

                  sm:px-3
                  sm:py-3
                "
              >
                <div className="mb-1 flex items-center gap-1 text-gray-400 sm:mb-1.5 sm:gap-1.5">
                  <CalendarDays size={12} className="sm:size-[13px]" />

                  <span className="text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">
                    Category
                  </span>
                </div>

                <p className="truncate text-[11px] font-bold text-gray-900 sm:text-xs">
                  {category}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCHEDULES
        ============================================================ */}
        <section
          className="
            mt-5
            rounded-lg
            border
            border-gray-200
            bg-white
            p-4
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]

            sm:mt-6
            sm:rounded-xl
            sm:p-5

            md:p-6
          "
        >
          {/* Heading */}
          <div className="mb-4 flex items-end justify-between sm:mb-5">
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold tracking-tight text-gray-900 sm:text-base">
                Available Schedules
              </h2>

              <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
                Select a schedule that works best for you.
              </p>
            </div>

            <span className="ml-3 hidden shrink-0 rounded-full bg-gray-50 px-2.5 py-1 text-[9px] font-semibold text-gray-500 sm:block">
              {schedules.length}{" "}
              {schedules.length === 1 ? "schedule" : "schedules"}
            </span>
          </div>

          {/* ============================================================
              SCHEDULE LIST
          ============================================================ */}
          <div className="space-y-3 sm:space-y-4">
            {schedules.length > 0 ? (
              schedules.map((schedule) => {
                const isBooked = schedule.bookings.some(
                  (booking) => booking.userId === user?.id
                );

                const isPast = new Date(schedule.endAt) <= new Date();

                const isFull = schedule.capacity === 0;

                return (
                  <article
                    key={schedule.id}
                    className="
                      group
                      min-h-[90px]
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      p-4
                      transition-all
                      hover:border-gray-300
                      hover:shadow-sm

                      sm:min-h-[80px]
                      sm:p-5
                    "
                  >
                    <div
                      className="
                        flex
                        min-h-[50px]
                        flex-col
                        justify-between
                        gap-3

                        lg:flex-row
                        lg:items-center
                      "
                    >
                      {/* ==================================================
                          SCHEDULE INFORMATION
                      ================================================== */}
                      <div className="min-w-0 flex-1">
                        {/* Date / Time / Location */}
                        <div
                          className="
                            flex
                            flex-col
                            gap-2

                            sm:flex-row
                            sm:flex-wrap
                            sm:items-center
                            sm:gap-x-4
                            sm:gap-y-2

                            md:gap-x-5

                            lg:gap-x-6
                          "
                        >
                          {/* Date */}
                          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                            <CalendarDays
                              size={14}
                              className="shrink-0 text-red-600 sm:size-[15px]"
                            />

                            <span className="truncate text-xs font-bold text-gray-900 sm:text-sm">
                              {formatDate(schedule.date)}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                            <Clock3
                              size={14}
                              className="shrink-0 text-gray-400 sm:size-[15px]"
                            />

                            <span className="truncate text-xs font-medium text-gray-600 sm:text-sm">
                              {formatTime(schedule.startAt)} -{" "}
                              {formatTime(schedule.endAt)}
                            </span>
                          </div>

                          {/* Location */}
                          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                            <MapPin
                              size={14}
                              className="shrink-0 text-gray-400 sm:size-[15px]"
                            />

                            <span className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                              {formatLocation(schedule.location)}
                            </span>
                          </div>
                        </div>

                        {/* Capacity */}
                        <div className="mt-2 sm:mt-3">
                          <p className="text-[11px] text-gray-400 sm:text-xs">
                            <span className="font-bold text-gray-700">
                              {schedule.capacity}
                            </span>{" "}
                            spots available
                          </p>
                        </div>
                      </div>

                      {/* ==================================================
                          BOOKING ACTION
                      ================================================== */}
                      <div
                        className="
                          flex
                          shrink-0
                          items-center
                          border-t
                          border-gray-100
                          pt-2.5

                          sm:pt-3

                          lg:min-w-[130px]
                          lg:justify-end
                          lg:border-t-0
                          lg:pt-0
                        "
                      >
                        {isPast ? (
                          <div
                            className="
                              flex
                              h-7
                              w-full
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              border
                              border-zinc-200
                              bg-zinc-100
                              px-2.5
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-wide
                              text-zinc-500

                              sm:h-8
                              sm:w-auto
                              sm:gap-2
                              sm:px-3
                              sm:text-[10px]
                            "
                          >
                            <span
                              className="
                                flex
                                h-3
                                w-3
                                items-center
                                justify-center
                                rounded-full
                                bg-zinc-400
                                text-[7px]
                                text-white

                                sm:h-3.5
                                sm:w-3.5
                                sm:text-[8px]
                              "
                            >
                              ✓
                            </span>
                            Past
                          </div>
                        ) : isBooked ? (
                          <div
                            className="
                              flex
                              h-7
                              w-full
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              border
                              border-emerald-200
                              bg-emerald-50
                              px-2.5
                              text-[9px]
                              font-semibold
                              text-emerald-700

                              sm:h-8
                              sm:w-auto
                              sm:gap-2
                              sm:px-3
                              sm:text-[10px]
                            "
                          >
                            <span
                              className="
                                flex
                                h-3
                                w-3
                                items-center
                                justify-center
                                rounded-full
                                bg-emerald-600
                                text-[7px]
                                text-white

                                sm:h-3.5
                                sm:w-3.5
                                sm:text-[8px]
                              "
                            >
                              ✓
                            </span>
                            Booked
                          </div>
                        ) : isFull ? (
                          <div
                            className="
                              flex
                              h-7
                              w-full
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              border
                              border-red-200
                              bg-red-50
                              px-2.5
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-wide
                              text-red-600

                              sm:h-8
                              sm:w-auto
                              sm:gap-2
                              sm:px-3
                              sm:text-[10px]
                            "
                          >
                            <span
                              className="
                                flex
                                h-3
                                w-3
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                text-[7px]
                                text-white

                                sm:h-3.5
                                sm:w-3.5
                                sm:text-[8px]
                              "
                            >
                              !
                            </span>
                            Full
                          </div>
                        ) : (
                          <Button
                            type="button"
                            className="
                              group
                              relative
                              w-full
                              overflow-hidden
                              rounded-lg
                              border
                              border-red-500/30
                              bg-black
                              px-3
                              py-1.5
                              text-[9px]
                              font-semibold
                              tracking-wide
                              text-white
                              shadow-sm
                              transition-all
                              duration-300

                              sm:px-4
                              sm:py-2
                              sm:text-[10px]

                              lg:w-auto

                              hover:-translate-y-0.5
                              hover:border-red-500
                              hover:bg-red-600
                              hover:shadow-lg
                              hover:shadow-red-500/20
                              active:translate-y-0
                            "
                            onClick={() => {
                              createBooking(classId, trainerId, schedule.id);
                            }}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                              Book Now
                              <span
                                className="
                                  text-[8px]
                                  transition-transform
                                  duration-300

                                  sm:text-[9px]

                                  group-hover:translate-x-0.5
                                "
                              >
                                →
                              </span>
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-10
                  text-center

                  sm:px-5
                  sm:py-12
                "
              >
                <CalendarDays
                  size={24}
                  className="mx-auto text-gray-300 sm:size-7"
                />

                <h3 className="mt-3 text-xs font-bold text-gray-800 sm:text-sm">
                  No schedules available
                </h3>

                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                  There are currently no available schedules for this class.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewSchedulePage;
