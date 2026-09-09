import type { GraphResponseDto } from "../../types/booking.type";

const BookingActivity = ({ bookingStat, loading }: GraphResponseDto) => {
  const data = bookingStat;

  const totalBookings = data.reduce((total, item) => total + item.total, 0);

  const maxBookings = Math.max(0, ...data.map((item) => item.total));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDay = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const startDate = data.length > 0 ? new Date(data[0].date) : null;

  const endDate = data.length > 0 ? new Date(data[data.length - 1].date) : null;

  if (loading) {
    return (
      <div
        className="
          w-full
          animate-pulse
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-3
          font-poppins
          shadow-sm
          sm:p-5
        "
        aria-hidden="true"
      >
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div>
            <div className="h-3.5 w-32 rounded bg-slate-200 sm:h-4 sm:w-40" />

            <div className="mt-1.5 h-2.5 w-28 rounded bg-slate-100 sm:mt-2 sm:h-3 sm:w-36" />
          </div>

          {/* Total Bookings Skeleton */}
          <div className="h-6 w-20 rounded-md bg-slate-100 sm:h-7 sm:w-24 sm:rounded-lg" />
        </div>

        {/* Chart Skeleton */}
        <div className="flex h-28 items-end justify-between gap-2 sm:h-36 sm:gap-5">
          {Array.from({ length: 7 }).map((_, index) => {
            const heights = [
              "h-[35%]",
              "h-[55%]",
              "h-[42%]",
              "h-[75%]",
              "h-[60%]",
              "h-[90%]",
              "h-[68%]",
            ];

            return (
              <div
                key={index}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div
                  className={`
                    w-full
                    max-w-[24px]
                    rounded-t-md
                    bg-slate-200
                    ${heights[index]}
                    sm:max-w-[34px]
                  `}
                />

                {/* Day Label */}
                <div className="mt-1.5 h-2 w-6 rounded bg-slate-100 sm:mt-2 sm:h-2.5 sm:w-8" />
              </div>
            );
          })}
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-5 sm:pt-4">
          {/* Start */}
          <div>
            <div className="h-2 w-7 rounded bg-slate-100 sm:h-2.5 sm:w-9" />

            <div className="mt-1 h-3 w-12 rounded bg-slate-200 sm:h-3.5 sm:w-14" />
          </div>

          {/* 7 Day Total */}
          <div className="text-center">
            <div className="mx-auto h-2 w-12 rounded bg-slate-100 sm:h-2.5 sm:w-16" />

            <div className="mx-auto mt-1 h-4 w-7 rounded bg-slate-200 sm:h-5 sm:w-9" />
          </div>

          {/* End */}
          <div className="text-right">
            <div className="ml-auto h-2 w-7 rounded bg-slate-100 sm:h-2.5 sm:w-9" />

            <div className="mt-1 ml-auto h-3 w-12 rounded bg-slate-200 sm:h-3.5 sm:w-14" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-3 font-poppins shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div>
          <h2 className="text-xs font-semibold tracking-tight text-gray-900 sm:text-base">
            Booking Activity
            <span className="ml-1 text-[9px] font-normal text-gray-400 sm:text-xs">
              (Last 7 Days)
            </span>
          </h2>

          <p className="mt-0.5 text-[9px] text-gray-400 sm:mt-1 sm:text-xs">
            Daily booking activity
          </p>
        </div>

        {/* Total Bookings */}
        <div className="rounded-md bg-red-50 px-2 py-1 sm:rounded-lg sm:px-3 sm:py-1.5">
          <span className="text-[9px] font-semibold text-red-500 sm:text-xs">
            {totalBookings} bookings
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex h-28 items-end justify-between gap-2 sm:h-36 sm:gap-5">
        {data.map((item) => {
          const height = maxBookings > 0 ? (item.total / maxBookings) * 100 : 0;

          return (
            <div
              key={item.date}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              {/* Bar Container */}
              <div className="group relative flex h-full w-full items-end justify-center">
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 sm:mb-2">
                  <div className="whitespace-nowrap rounded-md bg-gray-900 px-2 py-1.5 text-[9px] font-medium text-white shadow-lg sm:rounded-lg sm:px-3 sm:py-2 sm:text-[10px]">
                    <div>{item.total} bookings</div>

                    <div className="mt-0.5 text-[8px] font-normal text-gray-400 sm:text-[9px]">
                      {formatDate(new Date(item.date))}
                    </div>
                  </div>

                  {/* Tooltip Arrow */}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-x-3 border-t-3 border-x-transparent border-t-gray-900 sm:border-x-4 sm:border-t-4" />
                </div>

                {/* Bar */}
                <div
                  className="w-full max-w-[24px] rounded-t-md bg-red-400 transition-all duration-300 group-hover:bg-red-500 sm:max-w-[34px]"
                  style={{
                    height: `${height}%`,
                  }}
                />
              </div>

              {/* Day */}
              <span className="mt-1.5 text-[8px] font-medium text-gray-400 sm:mt-2 sm:text-[10px]">
                {formatDay(item.date)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex h-28 items-center justify-center text-xs text-gray-400 sm:h-36">
          No booking activity available
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-5 sm:pt-4">
        <div>
          <p className="text-[8px] text-gray-400 sm:text-[10px]">Start</p>

          <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
            {startDate ? formatDate(startDate) : "--"}
          </span>
        </div>

        <div className="text-center">
          <p className="text-[8px] text-gray-400 sm:text-[10px]">7 Day Total</p>

          <span className="text-xs font-semibold text-gray-800 sm:text-sm">
            {totalBookings}
          </span>
        </div>

        <div className="text-right">
          <p className="text-[8px] text-gray-400 sm:text-[10px]">End</p>

          <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
            {endDate ? formatDate(endDate) : "--"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingActivity;
