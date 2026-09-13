import CurrentDate from "../../utils/CurrentDate";

import Cards from "../../components/ui/Cards";
import BookingActivity from "../../components/ui/BarGraph";
import UpcomingClasses from "../../components/ui/UpcomingClasses";
import RecentBooking from "../../components/ui/RecentBooking";
import QuickActions from "../../components/ui/QuickActions";

import useRecentBooking from "../../hooks/useRecentBookings";
import useGraphStat from "../../hooks/useGraphStat";
import useUpcomingSchedule from "../../hooks/useUpcomingSchedule";

const Dashboard = () => {
  const { recentBook, loading: recentBookingLoading } = useRecentBooking();

  const { bookingStat, loading: graphLoading } = useGraphStat();

  const { upcoming, loading: upcomingLoading } = useUpcomingSchedule();

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden font-poppins">
      {/* Dashboard Header */}
      <header
        className="
          mb-9
          shrink-0
          sm:mb-9
          md:mb-9
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 shrink-0 rounded-full bg-red-600 sm:h-6" />

          <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl md:text-3xl">
            Admin Dashboard
          </h1>
        </div>

        <p className="mt-1 text-[10px] text-gray-500 opacity-70 sm:mt-1.5 sm:text-xs md:text-sm">
          <CurrentDate /> ─ Here's your gym at a glance.
        </p>
      </header>

      {/* Dashboard Content */}
      <div
        className="
          min-h-0
          w-full
          min-w-0
          flex-1
        "
      >
        <div className="flex h-full flex-col items-center">
          {/* Cards - NOT SCROLLABLE */}
          <div className="w-full shrink-0">
            <Cards />
          </div>

          {/* SCROLLABLE CONTENT ONLY */}
          <div
            className="
              scrollbar-hide
              min-h-0
              w-full
              flex-1
              overflow-y-auto
              pb-5
              sm:pb-6
              md:pb-8
            "
          >
            <div
              className="
                mt-2
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:mt-3
                sm:gap-4
                md:mt-3
              "
            >
              {/* Recent Booking + Right Side */}
              <div
                className="
                  flex
                  w-full
                  flex-col
                  gap-3
                  md:flex-row
                  md:items-start
                  md:gap-4
                "
              >
                {/* Recent Booking */}
                <div
                  className="
                    w-full
                    min-w-0
                    md:w-[320px]
                    lg:w-[340px]
                    xl:w-[360px]
                  "
                >
                  <RecentBooking
                    bookings={recentBook}
                    loading={recentBookingLoading}
                  />
                </div>

                {/* Quick Actions + Booking Activity */}
                <div className="flex w-full min-w-0 flex-1 flex-col gap-2 sm:gap-3">
                  <QuickActions />

                  <BookingActivity
                    bookingStat={bookingStat}
                    loading={graphLoading}
                  />
                </div>
              </div>

              {/* Upcoming Classes */}
              <div className="w-full">
                <UpcomingClasses
                  schedules={upcoming}
                  loading={upcomingLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
