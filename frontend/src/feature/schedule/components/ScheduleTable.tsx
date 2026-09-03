import { formatTime } from "../../../utils/DateFormatterHelper";

import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";

import { locationConfig } from "../../../types/schedule.type";
import { categoryConfig } from "../../../types/class.types";

import type { TablePropsDto } from "../../../types/schedule.type";

const ScheduleTable = ({
  schedule,
  onDelete,
  pagination,
  onPageChange,
}: TablePropsDto) => {
  return (
    <div className="flex h-[500px] min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:h-[530px] sm:rounded-2xl md:h-[550px]">
      {/* Table Area */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[900px] table-fixed text-left sm:min-w-[1000px] md:min-w-[1100px]">
          {/* Responsive column widths */}
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[18%]" />
            <col className="w-[20%]" />
            <col className="w-[18%]" />
            <col className="w-[15%]" />
            <col className="w-[12%]" />
            <col className="w-[11%]" />
          </colgroup>

          {/* Header */}
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-black text-white">
            <tr>
              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Class
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Trainer
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Date & Time
              </th>

              <th className="px-2 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Location
              </th>

              <th className="px-2 py-2.5 text-center text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Capacity
              </th>

              <th className="px-2 py-2.5 text-center text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 sm:text-[10px] md:px-4 md:py-3.5 md:text-[11px]">
                Status
              </th>

              <th className="px-2 py-2.5 text-center text-[9px] font-semibold uppercase tracking-wider sm:px-3 sm:py-3 md:px-4 md:py-3.5 md:text-[11px]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {schedule && schedule.length > 0 ? (
              schedule.map((item) => {
                const location = locationConfig.find(
                  (option) => option.value === item.location
                );

                const category = categoryConfig.find(
                  (option) => option.value === item.class.category
                );

                /*
                 * CAPACITY CALCULATION
                 *
                 * item.capacity = maximum allowed
                 * item.booked = number of people already booked
                 */

                const maxCapacity = item.capacity;

                const booked = item.booked ?? 0;

                // Make sure booked never goes below 0
                // or above the maximum capacity.
                const currentBooked = Math.min(
                  Math.max(booked, 0),
                  maxCapacity
                );

                // How many slots are still available
                const remaining = maxCapacity - currentBooked;

                // How full the schedule is
                const percentage =
                  maxCapacity > 0 ? (currentBooked / maxCapacity) * 100 : 0;

                /*
                 * PROGRESS COLOR
                 *
                 * 0 bookings  = gray
                 * < 60%       = green
                 * 60% - 84%    = orange
                 * 85%+        = red
                 */

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
                    className="group transition-colors duration-150 hover:bg-slate-50/60"
                  >
                    {/* Class */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="ml-1 min-w-0 sm:ml-1.5 md:ml-2">
                        <p
                          className="flex flex-col truncate text-[11px] font-semibold leading-4 text-slate-900 sm:text-xs sm:leading-5 md:text-sm"
                          title={item.class.className}
                        >
                          {/* Class Name */}
                          <span className="truncate">
                            {item.class.className}
                          </span>

                          {/* Category */}
                          <span className="font-poppins truncate text-[11px] font-normal leading-4 text-slate-500 opacity-[.6]">
                            {category?.label}
                          </span>
                        </p>
                      </div>
                    </td>

                    {/* Trainer */}
                    <td className="overflow-hidden px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <span
                        className="block truncate text-[10px] font-medium text-slate-700 sm:text-xs md:text-sm"
                        title={item.trainer.name}
                      >
                        {item.trainer.name}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span
                          className="truncate text-[10px] font-semibold text-slate-800 sm:text-xs md:text-sm"
                          title={new Date(item.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        >
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>

                        <span className="truncate text-[9px] text-slate-400 sm:text-[10px] md:text-xs">
                          {formatTime(item.startAt)} - {formatTime(item.endAt)}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="overflow-hidden px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <span
                        className="block truncate text-[10px] font-medium text-slate-700 sm:text-xs md:text-sm"
                        title={item.location}
                      >
                        {location?.label}
                      </span>
                    </td>

                    {/* Capacity */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="flex items-center gap-2">
                        {/* Progress Bar */}
                        <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        {/* Remaining Slots */}
                        <span className="min-w-[22px] text-right text-[10px] font-semibold text-slate-700 sm:text-xs">
                          {remaining}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2.5 text-center sm:px-3 sm:py-3 md:px-4 md:py-4">
                      {item.status === "Open" ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600 sm:gap-1 sm:px-2 sm:py-1 sm:text-[9px] md:gap-1.5 md:px-2.5 md:text-xs">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500 sm:h-1.5 sm:w-1.5" />
                          Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold text-slate-500 sm:gap-1 sm:px-2 sm:py-1 sm:text-[9px] md:gap-1.5 md:px-2.5 md:text-xs">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400 sm:h-1.5 sm:w-1.5" />

                          {item.status}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4">
                      <div className="flex justify-center">
                        {item.status === "Past" ? (
                          ""
                        ) : (
                          <Button
                            onClick={() => onDelete(item.id)}
                            type="button"
                            className="flex h-7 items-center justify-center rounded-md border border-red-100 bg-white px-2 text-[9px] font-semibold text-red-500 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:h-8 sm:rounded-lg sm:px-2.5 sm:text-[10px] md:h-9 md:px-3 md:text-xs"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="h-[300px] sm:h-[360px] md:h-[400px]">
                <td
                  colSpan={7}
                  className="px-3 text-center align-middle sm:px-4 md:px-6"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 sm:mb-3 sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
                      <svg
                        className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5 md:h-5 md:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                        />
                      </svg>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                      No schedules found
                    </p>

                    <p className="mt-1 max-w-[220px] text-[10px] leading-relaxed text-slate-400 sm:max-w-none sm:text-xs">
                      Create a schedule to see it appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination stays fixed */}
      <div className="shrink-0 border-t border-slate-100">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default ScheduleTable;
