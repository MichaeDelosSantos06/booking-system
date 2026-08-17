import CurrentDate from "../../utils/CurrentDate";
import Cards from "../../components/ui/Cards";
import BookingActivity from "../../components/ui/BarGraph";
import UpcomingClasses from "../../components/ui/UpcomingClasses";
import RecentBooking from "../../components/ui/RecentBooking";
import QuickActions from "../../components/ui/QuickActions";

const Dashboard = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col font-poppins">
      {/* Dashboard Header */}
      <div className="shrink-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        <h1 className="text-xl font-bold sm:text-2xl">Admin Dashboard</h1>

        <p className="text-[10px] text-gray opacity-[.7] sm:text-xs">
          <CurrentDate /> ─ Here's your gym at a glance.
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="min-h-0 flex-1 px-4 sm:px-6 lg:px-10">
        <div className="flex h-full flex-col items-center">
          {/* Cards - NOT SCROLLABLE */}
          <div className="w-full shrink-0">
            <Cards />
          </div>

          {/* SCROLLABLE CONTENT ONLY */}
          <div className="custom-scrollbar min-h-0 w-[97%] flex-1 overflow-y-auto pb-8">
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              {/* Recent Booking + Right Side */}
              <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
                {/* Recent Booking */}
                <div className="w-full min-w-0 md:w-[320px] lg:w-[340px] xl:w-[360px]">
                  <RecentBooking />
                </div>

                {/* Quick Actions + Booking Activity */}
                <div className="flex w-full min-w-0 flex-1 flex-col gap-2">
                  <QuickActions />
                  <BookingActivity />
                </div>
              </div>

              {/* Upcoming Classes */}
              <div className="w-full">
                <UpcomingClasses />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
