import { useMemo } from "react";

type BookingData = {
  date: string;
  bookings: number;
};

// Mock data for now
const mockBookings: BookingData[] = [
  { date: "2026-08-09", bookings: 8 },
  { date: "2026-08-10", bookings: 12 },
  { date: "2026-08-11", bookings: 18 },
  { date: "2026-08-12", bookings: 15 },
  { date: "2026-08-13", bookings: 22 },
  { date: "2026-08-14", bookings: 14 },
  { date: "2026-08-15", bookings: 9 },
];

const BookingActivity = () => {
  const data = useMemo(() => mockBookings, []);

  const totalBookings = data.reduce((total, item) => total + item.bookings, 0);

  const maxBookings = Math.max(...data.map((item) => item.bookings));

  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);

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
          const height =
            maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0;

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
                    <div>{item.bookings} bookings</div>

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

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 sm:mt-5 sm:pt-4">
        <div>
          <p className="text-[8px] text-gray-400 sm:text-[10px]">Start</p>

          <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
            {formatDate(startDate)}
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
            {formatDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingActivity;
