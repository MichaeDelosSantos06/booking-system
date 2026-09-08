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
    await BookingService.createBooking({ classId, trainerId, scheduleId });
    toast.success("Booked Successfully!");
  };

  if (!state) {
    return (
      <div className="m-12">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-base font-bold text-gray-900">Class not found</h1>

          <p className="mt-1 text-xs text-gray-500">
            The class information is no longer available.
          </p>

          <Button type="button" onClick={() => navigate(-1)} className="mt-5">
            Back to Classes
          </Button>
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
    <div className="m-12">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={14} />
        Back to Classes
      </button>

      {/* ================= CLASS HEADER ================= */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {/* Hero */}
        <div className="relative h-52 overflow-hidden sm:h-56">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={className}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <Dumbbell size={40} strokeWidth={1.5} className="text-gray-300" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Hero content */}
          <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6">
            <div className="mb-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-gray-800 shadow-sm">
                {category}
              </span>

              <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-gray-800 shadow-sm">
                {difficulty}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {className}
            </h1>
          </div>
        </div>

        {/* Class Details */}
        <div className="px-5 py-5 sm:px-6">
          <p className="max-w-5xl text-xs leading-6 text-gray-600">
            {description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {/* Trainer */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-gray-400">
                <UserRound size={13} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Trainer
                </span>
              </div>

              <p className="truncate text-xs font-bold text-gray-900">
                {trainer}
              </p>
            </div>

            {/* Duration */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-gray-400">
                <Clock3 size={13} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Duration
                </span>
              </div>

              <p className="text-xs font-bold text-gray-900">{duration} min</p>
            </div>

            {/* Difficulty */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-gray-400">
                <Dumbbell size={13} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Difficulty
                </span>
              </div>

              <p className="text-xs font-bold text-gray-900">{difficulty}</p>
            </div>

            {/* Category */}
            <div className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-gray-400">
                <CalendarDays size={13} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Category
                </span>
              </div>

              <p className="truncate text-xs font-bold text-gray-900">
                {category}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULES ================= */}
      <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:p-6">
        {/* Heading */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-gray-900">
              Available Schedules
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Select a schedule that works best for you.
            </p>
          </div>

          <span className="hidden rounded-full bg-gray-50 px-2.5 py-1 text-[9px] font-semibold text-gray-500 sm:block">
            {schedules.length}{" "}
            {schedules.length === 1 ? "schedule" : "schedules"}
          </span>
        </div>

        {/* Schedule List */}
        <div className="space-y-2.5">
          {/* check if the authenticated user is already book specific schdule from the class */}
          {schedules.length > 0 ? (
            schedules.map((schedule) => {
              const isBooked = schedule.bookings.some(
                (booking) => booking.userId === user?.id
              );

              const isPast = new Date(schedule.endAt) <= new Date();

              return (
                <article
                  key={schedule.id}
                  className="group rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    {/* Schedule info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                        {/* Date */}
                        <div className="flex items-center gap-1.5">
                          <CalendarDays
                            size={13}
                            className="shrink-0 text-red-600"
                          />

                          <span className="text-xs font-bold text-gray-900">
                            {formatDate(schedule.date)}
                          </span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1.5">
                          <Clock3
                            size={13}
                            className="shrink-0 text-gray-400"
                          />

                          <span className="text-[11px] font-medium text-gray-600">
                            {formatTime(schedule.startAt)} -{" "}
                            {formatTime(schedule.endAt)}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5">
                          <MapPin
                            size={13}
                            className="shrink-0 text-gray-400"
                          />

                          <span className="text-[11px] font-medium text-gray-500">
                            {formatLocation(schedule.location)}
                          </span>
                        </div>
                      </div>

                      {/* Capacity */}
                      <p className="mt-2 text-[10px] text-gray-400">
                        <span className="font-semibold text-gray-600">
                          {schedule.capacity}
                        </span>{" "}
                        spots available
                      </p>
                    </div>
                    {/* Book */}

                    <div className="shrink-0">
                      {isPast ? (
                        <div className="flex h-6 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-zinc-400 text-[8px] text-white">
                            ✓
                          </span>
                          Past
                        </div>
                      ) : isBooked ? (
                        <div className="flex h-6 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-[10px] font-semibold text-emerald-700">
                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-600 text-[8px] text-white">
                            ✓
                          </span>
                          Booked
                        </div>
                      ) : (
                        <Button
                          type="button"
                          className="group relative w-full overflow-hidden rounded-lg border border-red-500/30 bg-black px-3 py-1 text-[10px] font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20 active:translate-y-0 sm:w-auto"
                          onClick={() => {
                            createBooking(classId, trainerId, schedule.id);
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Book Now
                            <span className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5">
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
            <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
              <CalendarDays size={25} className="mx-auto text-gray-300" />

              <h3 className="mt-2 text-xs font-bold text-gray-800">
                No schedules available
              </h3>

              <p className="mt-1 text-[10px] text-gray-500">
                There are currently no available schedules for this class.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewSchedulePage;
