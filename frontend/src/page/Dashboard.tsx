import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import SideBar from "../components/layout/SideBar";
import CurrentDate from "../utils/CurrentDate";
import Cards from "../components/ui/Cards";
import BookingActivity from "../components/ui/BarGraph";
import UpcomingClasses from "../components/ui/UpcomingClasses";
import RecentBooking from "../components/ui/RecentBooking";
import QuickActions from "../components/ui/QuickActions";

const Dashboard = () => {
  const { isInitializing } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-500/5">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideBar />
      </div>

      {/* Mobile / Tablet Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        <div className="relative h-full">
          <SideBar />

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Dashboard */}
      <div className="flex min-w-0 flex-1 flex-col font-poppins">
        {/* Header */}
        <div className="shrink-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
          {/* Mobile / Tablet Header */}
          <div className="mb-5 flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-black text-white transition-colors hover:bg-gray-800"
            >
              <Menu size={20} />
            </button>
          </div>

          <h1 className="text-xl font-bold sm:text-2xl">Admin Dashboard</h1>

          <p className="text-[10px] text-gray opacity-[.7] sm:text-xs">
            <CurrentDate /> ─ Here's your gym at a glance.
          </p>
        </div>

        {/* Dashboard */}
        <div className="min-h-0 flex-1 px-4 sm:px-6 lg:px-10">
          <div className="flex h-full flex-col items-center">
            {/* CARDS - NOT SCROLLABLE */}
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
    </div>
  );
};

export default Dashboard;
