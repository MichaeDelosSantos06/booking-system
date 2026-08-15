type UpcomingClass = {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  booked: number;
  capacity: number;
};

const mockClasses: UpcomingClass[] = [
  {
    id: 1,
    name: "Zumba Party",
    date: "Aug 19, 2026",
    time: "10:00 AM - 11:00 AM",
    location: "Studio B",
    booked: 20,
    capacity: 25,
  },
  {
    id: 2,
    name: "Boxing Fundamentals",
    date: "Aug 19, 2026",
    time: "2:00 PM - 3:00 PM",
    location: "Studio A",
    booked: 16,
    capacity: 20,
  },
  {
    id: 3,
    name: "Strength Training",
    date: "Aug 20, 2026",
    time: "9:00 AM - 10:00 AM",
    location: "Gym Floor",
    booked: 12,
    capacity: 15,
  },
  {
    id: 4,
    name: "Yoga Flow",
    date: "Aug 20, 2026",
    time: "5:00 PM - 6:00 PM",
    location: "Studio B",
    booked: 8,
    capacity: 20,
  },
  {
    id: 5,
    name: "HIIT Training",
    date: "Aug 21, 2026",
    time: "7:00 AM - 8:00 AM",
    location: "Studio A",
    booked: 18,
    capacity: 20,
  },
  {
    id: 6,
    name: "Functional Training",
    date: "Aug 21, 2026",
    time: "4:00 PM - 5:00 PM",
    location: "Gym Floor",
    booked: 10,
    capacity: 15,
  },
];

const UpcomingClasses = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-poppins shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="min-w-0">
          <h1 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
            Upcoming Classes
          </h1>

          <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
            Scheduled classes and available slots
          </p>
        </div>

        <button
          type="button"
          className="ml-3 shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 sm:px-3 sm:text-xs"
        >
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                CLASS
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                DATE & TIME
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:px-5 lg:px-6">
                LOCATION
              </th>

              <th className="w-[200px] px-4 py-3 text-left text-[9px] font-semibold tracking-wide text-gray-500 sm:w-[220px] sm:px-5 lg:px-6">
                SLOTS
              </th>
            </tr>
          </thead>

          <tbody>
            {mockClasses.map((item) => {
              const percentage = Math.min(
                (item.booked / item.capacity) * 100,
                100
              );

              const remaining = item.capacity - item.booked;

              return (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/60"
                >
                  {/* Class */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <p className="whitespace-nowrap text-xs font-medium text-gray-900 sm:text-sm">
                      {item.name}
                    </p>
                  </td>

                  {/* Date & Time */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <p className="whitespace-nowrap text-[10px] font-medium text-gray-700 sm:text-xs">
                      {item.date}
                    </p>

                    <p className="mt-1 whitespace-nowrap text-[9px] text-gray-400 sm:text-[10px]">
                      {item.time}
                    </p>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <span className="whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1.5 text-[9px] font-medium text-gray-600 sm:px-3 sm:text-[10px]">
                      {item.location}
                    </span>
                  </td>

                  {/* Slots */}
                  <td className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6">
                    <div className="w-full max-w-[220px]">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-gray-700 sm:text-[10px]">
                          {item.booked}/{item.capacity}
                        </span>

                        <span className="text-[8px] text-gray-400 sm:text-[9px]">
                          {remaining} {remaining === 1 ? "spot" : "spots"} left
                        </span>
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 sm:h-2">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingClasses;
