import type { BookingTableProps } from "../../../types/booking.type";

import { formatDate, formatTime } from "../../../utils/DateFormatterHelper";

import Button from "../../../components/ui/Button";
import Pagination from "../../../components/ui/Pagination";

const BookingTable = ({
  bookings,
  pagination,
  onPageChange,
  handleCancel,
  loading = false,
}: BookingTableProps) => {
  if (loading) {
    return (
      <div
        className="
          flex
          h-full
          min-h-0
          w-full
          animate-pulse
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-slate-200/80
          bg-white
          shadow-[0_4px_20px_rgba(15,23,42,0.05)]
          sm:h-[435px]
          sm:rounded-2xl
          md:h-[515px]
        "
        aria-hidden="true"
      >
        {/* Table */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            {/* Same column widths as real table */}
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[15%]" />
              <col className="w-[13%]" />
              <col className="w-[11%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
            </colgroup>

            {/* Header Skeleton */}
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-12 rounded bg-slate-200 sm:h-3 sm:w-14 md:h-3.5 md:w-16" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-10 rounded bg-slate-200 sm:h-3 sm:w-12 md:h-3.5 md:w-14" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-12 rounded bg-slate-200 sm:h-3 sm:w-14 md:h-3.5 md:w-16" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-8 rounded bg-slate-200 sm:h-3 sm:w-10 md:h-3.5 md:w-12" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-9 rounded bg-slate-200 sm:h-3 sm:w-11 md:h-3.5 md:w-12" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-12 rounded bg-slate-200 sm:h-3 sm:w-14 md:h-3.5 md:w-16" />
                </th>

                <th className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                  <div className="h-2.5 w-14 rounded bg-slate-200 sm:h-3 sm:w-16 md:h-3.5 md:w-18" />
                </th>
              </tr>
            </thead>

            {/* Body Skeleton */}
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="h-[52px] sm:h-[58px] md:h-[65px]">
                  {/* Member */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                      {/* Avatar */}
                      <div className="h-7 w-7 shrink-0 rounded-lg bg-slate-200 sm:h-8 sm:w-8 md:h-9 md:w-9 md:rounded-xl" />

                      {/* Name + email */}
                      <div className="min-w-0">
                        <div className="h-2.5 w-20 rounded bg-slate-200 sm:h-3 sm:w-24 md:h-3.5 md:w-28" />

                        <div className="mt-1.5 h-2 w-24 rounded bg-slate-100 sm:h-2.5 sm:w-28 md:w-32" />
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="h-3 w-20 rounded bg-slate-200 sm:h-3.5 sm:w-24 md:h-4 md:w-28" />
                  </td>

                  {/* Trainer */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                      <div className="h-3 w-16 rounded bg-slate-200 sm:h-3.5 sm:w-20 md:h-4 md:w-24" />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="h-3 w-16 rounded bg-slate-200 sm:h-3.5 sm:w-20 md:h-4 md:w-24" />
                  </td>

                  {/* Time */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="h-2.5 w-8 rounded bg-slate-200 sm:h-3 sm:w-10" />

                      <div className="h-px w-2 bg-slate-200" />

                      <div className="h-2.5 w-8 rounded bg-slate-200 sm:h-3 sm:w-10" />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="h-5 w-16 rounded-full bg-slate-100 sm:h-6 sm:w-18 md:h-7 md:w-20" />
                  </td>

                  {/* Actions */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex justify-center">
                      <div className="h-6 w-12 rounded-lg bg-slate-100 sm:h-7 sm:w-14 md:h-8 md:w-16" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div
          className="
            flex
            h-[48px]
            shrink-0
            items-center
            justify-between
            border-t
            border-slate-100
            bg-white
            px-3
            sm:h-[52px]
            sm:px-4
            md:h-[56px]
          "
        >
          {/* Pagination info */}
          <div className="h-2.5 w-20 rounded bg-slate-100 sm:h-3 sm:w-24" />

          {/* Pagination buttons */}
          <div className="flex items-center gap-1.5">
            <div className="h-7 w-7 rounded-md bg-slate-100 sm:h-8 sm:w-8" />

            <div className="h-7 w-7 rounded-md bg-slate-200 sm:h-8 sm:w-8" />

            <div className="h-7 w-7 rounded-md bg-slate-100 sm:h-8 sm:w-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-slate-200/80
        bg-white
        shadow-[0_4px_20px_rgba(15,23,42,0.05)]
        sm:h-[435px]
        sm:rounded-2xl
        md:h-[515px]
      "
    >
      {/* Table */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1050px] border-collapse text-left">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
          </colgroup>

          {/* Header */}
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-800 bg-black">
              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                MEMBER
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                CLASS
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                TRAINER
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                DATE
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                TIME
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                STATUS
              </th>

              <th className="whitespace-nowrap px-2.5 py-2 text-[8px] font-bold tracking-[0.08em] text-white sm:px-3 sm:py-2.5 sm:text-[9px] sm:tracking-[0.1em] md:px-4 md:py-3 md:text-[10px] md:tracking-[0.12em]">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="group transition-colors duration-150 hover:bg-slate-50/70"
                >
                  {/* Member */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 md:gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[9px] font-bold text-white shadow-sm sm:h-8 sm:w-8 sm:text-[10px] md:h-9 md:w-9 md:rounded-xl md:text-xs">
                        {booking.user.name?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[120px] truncate text-[10px] font-semibold text-slate-800 sm:max-w-[140px] sm:text-xs md:max-w-[170px] md:text-sm">
                          {booking.user.name}
                        </p>

                        <p className="mt-0.5 max-w-[135px] truncate text-[8px] text-slate-400 sm:max-w-[155px] sm:text-[10px] md:max-w-[190px] md:text-xs">
                          {booking.user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <p className="max-w-[120px] truncate text-[10px] font-medium text-slate-700 sm:max-w-[145px] sm:text-xs md:max-w-[175px] md:text-sm">
                      {booking.schedule.class.className}
                    </p>
                  </td>

                  {/* Trainer */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex min-w-0 items-center gap-1 sm:gap-1.5 md:gap-2">
                      <div
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          booking.trainer.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />

                      <span className="max-w-[100px] truncate whitespace-nowrap text-[10px] text-slate-600 sm:max-w-[120px] sm:text-xs md:max-w-[150px] md:text-sm">
                        {booking.trainer.name}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <span className="text-[10px] font-medium text-slate-600 sm:text-xs md:text-sm">
                      {formatDate(booking.schedule.date)}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-[6px]">
                      <span className="text-[9px] font-medium text-slate-700 sm:text-[10px] md:text-[11px]">
                        {formatTime(booking.schedule.startAt)}
                      </span>

                      <span className="h-px w-1.5 bg-slate-300 sm:w-2" />

                      <span className="text-[9px] font-medium text-slate-700 sm:text-[10px] md:text-[11px]">
                        {formatTime(booking.schedule.endAt)}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-semibold sm:gap-1.5 sm:px-2 sm:py-0.5 sm:text-[9px] md:px-2.5 md:py-1 md:text-[11px] ${
                        booking.status === "Confirmed"
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : booking.status === "Cancelled"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-green-200 bg-green-50 text-green-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-blue-500"
                            : booking.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-green-500"
                        }`}
                      />

                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                    {booking.status === "Cancelled" ||
                    booking.status === "Completed" ? (
                      " "
                    ) : (
                      <Button
                        onClick={() => handleCancel(booking.id)}
                        type="button"
                        className="flex h-6 items-center justify-center rounded-lg border border-red-200 bg-white px-2 text-[9px] font-semibold text-red-500 shadow-none transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-[0_0_12px_rgba(239,68,68,0.12)] sm:h-7 sm:px-2.5 sm:text-[10px] md:h-8 md:px-3 md:text-xs"
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="h-[180px] px-4 text-center sm:h-[220px] md:h-[320px]"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 sm:mb-2.5 sm:h-10 sm:w-10 md:mb-3 md:h-12 md:w-12">
                      <div className="h-2 w-2 rounded-full bg-slate-300 shadow-[8px_0_0_#cbd5e1,-8px_0_0_#cbd5e1]" />
                    </div>

                    <p className="text-[10px] font-semibold text-slate-600 sm:text-xs md:text-sm">
                      No bookings found
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px] md:text-xs">
                      There are currently no bookings to display.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="shrink-0 border-t border-slate-100 bg-white">
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default BookingTable;
