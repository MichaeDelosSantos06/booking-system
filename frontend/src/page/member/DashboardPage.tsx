import { Hand, ArrowRight, CalendarDays, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import MemberCards from "../../feature/member/components/MemberCards";
import BookingList from "../../feature/dashboard/components/BookingList";
import RigthCta from "../../feature/dashboard/components/RightCta";
import MyRecentBookings from "../../feature/dashboard/components/RecentBookings";

import { useAuth } from "../../hooks/useAuth";
import useFetchBooking from "../../hooks/useFetchBooking";

const MemberDashboardPage = () => {
  const { user } = useAuth();

  const { bookings, loading } = useFetchBooking("Confirmed");

  const { bookings: allBookings, loading: allBookingsLoading } =
    useFetchBooking(undefined, 3);

  const navigate = useNavigate();

  const handleViewBooking = (bookingId: number) => {
    navigate(`/my-bookings?tab=Confirmed&highlight=${bookingId}`);
  };

  const handleBrowseClasses = () => {
    navigate("/browse-classes");
  };

  const recentMemberActivity = allBookings.filter(
    (item) => item.status !== "Confirmed"
  );

  return (
    <main
      className="
  mx-auto
  flex
  h-full
  w-full
  max-w-[1600px]
  flex-col
  overflow-hidden
  px-10
  py-6
  sm:py-7
  lg:py-8
"
    >
      {/* Header */}
      <header className="mb-6 shrink-0 sm:mb-7 lg:mb-8">
        <div className="flex min-w-0 items-center gap-2">
          <h1
            className="
              min-w-0
              truncate
              text-lg
              font-bold
              tracking-tight
              text-gray-950
              sm:text-xl
              lg:text-2xl
            "
          >
            Welcome back, {user?.name}
          </h1>

          <Hand
            className="
              h-[19px]
              w-[19px]
              shrink-0
              text-red-600
              sm:h-[21px]
              sm:w-[21px]
              lg:h-[23px]
              lg:w-[23px]
            "
            strokeWidth={2}
          />
        </div>

        <p
          className="
            mt-1
            truncate
            text-[11px]
            font-medium
            text-gray-500
            sm:text-xs
            lg:text-sm
          "
        >
          Here's what's coming up for you.
        </p>
      </header>

      {/* Statistics - NEVER SCROLLS */}
      <div className="shrink-0">
        <MemberCards />
      </div>

      {/* Dashboard Content - SCROLLS ON MOBILE + MEDIUM */}
      <section
        className="
          mt-3
          min-h-0
          flex-1
          overflow-y-auto
          pr-1
          scrollbar-hide
          sm:mt-3
          lg:mt-4
          lg:overflow-visible
          lg:pr-0
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-4
            pb-4
            sm:gap-5
            lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]
            lg:gap-5
            xl:gap-6
          "
        >
          {/* =========================================================
              LEFT COLUMN - UPCOMING CLASSES
          ========================================================== */}
          <div className="min-w-0">
            <div
              className="
                flex
                min-h-[360px]
                min-w-0
                flex-col
                rounded-2xl
                border
                border-gray-200/70
                bg-white
                p-3
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                sm:min-h-[400px]
                sm:p-4
                md:min-h-[430px]
                lg:h-[470px]
                lg:min-h-full
                lg:p-5
              "
            >
              {/* Section Header */}
              <div
                className="
                  mb-3
                  flex
                  shrink-0
                  items-center
                  justify-between
                  gap-2
                  sm:mb-4
                "
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      sm:h-8
                      sm:w-8
                    "
                  >
                    <CalendarDays
                      className="
                        h-[14px]
                        w-[14px]
                        text-red-600
                        sm:h-4
                        sm:w-4
                      "
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2
                      className="
                        truncate
                        text-xs
                        font-bold
                        text-gray-950
                        sm:text-sm
                        lg:text-base
                      "
                    >
                      Upcoming Classes
                    </h2>

                    <p
                      className="
                        truncate
                        text-[9px]
                        text-gray-400
                        sm:text-[10px]
                        lg:text-xs
                      "
                    >
                      Your scheduled classes
                    </p>
                  </div>
                </div>

                <Link
                  to="/my-bookings?tab=Confirmed"
                  className="
                    group
                    flex
                    shrink-0
                    items-center
                    gap-1
                    rounded-lg
                    px-1.5
                    py-1
                    text-[9px]
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                    sm:px-2
                    sm:py-1.5
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  View All
                  <ArrowRight
                    className="
                      h-[10px]
                      w-[10px]
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                      sm:h-3
                      sm:w-3
                    "
                  />
                </Link>
              </div>

              {/* Booking List */}
              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  pr-1
                  scrollbar-hide
                "
              >
                <BookingList
                  bookings={bookings}
                  loading={loading}
                  onNavigate={handleViewBooking}
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN
          ========================================================== */}
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-7
              sm:gap-6
            "
          >
            {/* =======================================================
                CTA
            ======================================================== */}
            <div
              className="
                h-[180px]
                w-full
                shrink-0
                sm:h-[180px]
                md:h-[180px]
                lg:h-[190px]
              "
            >
              <RigthCta browse={handleBrowseClasses} />
            </div>

            {/* =======================================================
                RECENT ACTIVITY

                Mobile:  190px minimum
                Small:   210px minimum
                Medium:  230px minimum
                Large:   260px minimum
            ======================================================== */}
            <div
              className="
                flex
                min-h-[190px]
                w-full
                min-w-0
                flex-col
                rounded-2xl
                border
                border-gray-200/70
                bg-white
                p-2
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                sm:min-h-[210px]
                sm:p-2
                md:min-h-[230px]
                lg:min-h-[260px]
              "
            >
              {/* Header */}
              <div
                className="
                  mb-2
                  flex
                  shrink-0
                  items-center
                  justify-between
                  pl-1
                  sm:mb-3
                  sm:pl-2
                  
                "
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-100
                      sm:h-8
                      sm:w-8
                      
                    "
                  >
                    <Activity
                      className="
                        h-[14px]
                        w-[14px]
                        text-gray-700
                        sm:h-[15px]
                        sm:w-[15px]
                      "
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2
                      className="
                        truncate
                        text-xs
                        font-bold
                        text-gray-950
                        sm:text-sm
                        lg:text-base
                      "
                    >
                      Recent Activity
                    </h2>

                    <p
                      className="
                        truncate
                        text-[9px]
                        text-gray-400
                        sm:text-[10px]
                        lg:text-xs
                      "
                    >
                      Your latest booking activity
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity List */}
              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  scrollbar-hide
                  
                "
              >
                <MyRecentBookings
                  bookings={recentMemberActivity}
                  loading={allBookingsLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MemberDashboardPage;
