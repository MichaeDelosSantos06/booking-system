import { useState } from "react";

import { useSearchParams } from "react-router-dom";

import ScheduleList from "../../feature/bookings/components/ScheduleList";

import CancelModal from "../../feature/bookings/components/CancelModal";

import useFetchBooking from "../../hooks/useFetchBooking";

import BookingService from "../../services/booking.service";

import type { BookingTabs } from "../../types/booking.type";

const MyBookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab");

  const initialTab: BookingTabs =
    tabParam === "All" ||
    tabParam === "Confirmed" ||
    tabParam === "Completed" ||
    tabParam === "Cancelled"
      ? tabParam
      : "All";

  const [activeTab, setActiveTab] = useState<BookingTabs>(initialTab);

  const [highlightedBookingId, setHighlightedBookingId] = useState<
    number | null
  >(() => {
    const highlightParam = searchParams.get("highlight");

    return highlightParam !== null && /^\d+$/.test(highlightParam)
      ? Number(highlightParam)
      : null;
  });

  const status = activeTab === "All" ? undefined : activeTab;

  const { bookings, bookingCount, loading, refetch } = useFetchBooking(status);

  const [cancelModal, setCancelModal] = useState(false);

  const [idBooking, setIdBooking] = useState<number | null>(null);

  const onClose = () => {
    setCancelModal(false);
    setIdBooking(null);
  };

  const onCancel = (bookingId: number) => {
    setIdBooking(bookingId);
    setCancelModal(true);
  };

  const handleCancel = async () => {
    if (idBooking === null) return;

    try {
      await BookingService.cancelBooking(idBooking);
      await refetch();
      setCancelModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-red-600" />

          <h1 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Bookings
          </h1>
        </div>

        <p className="mt-1.5 text-sm text-gray-500">
          View and Manage your class reservation.
        </p>
      </header>

      {/* Filters */}
      <div className="mt-4 w-full shrink-0 sm:mt-6">
        <div className="flex justify-center sm:justify-start">
          <div
            className="
              inline-flex
              w-full
              max-w-full
              items-center
              justify-center
              gap-2
              overflow-x-auto
              rounded-2xl
              border
              border-gray-200/70
              bg-gray-100/70
              p-1
              shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
              backdrop-blur-xl
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              sm:inline-flex
              sm:w-auto
            "
          >
            {[
              {
                label: "All",
                count: bookingCount?.all ?? 0,
                value: "All" as BookingTabs,
              },
              {
                label: "Confirmed",
                count: bookingCount?.confirmed ?? 0,
                value: "Confirmed" as BookingTabs,
              },
              {
                label: "Completed",
                count: bookingCount?.completed ?? 0,
                value: "Completed" as BookingTabs,
              },
              {
                label: "Cancelled",
                count: bookingCount?.cancelled ?? 0,
                value: "Cancelled" as BookingTabs,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.value);
                    setHighlightedBookingId(null);
                    setSearchParams({});
                  }}
                  className={`
                    relative
                    flex
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-lg
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-medium
                    leading-none
                    whitespace-nowrap
                    transition-all
                    duration-200
                    ease-out
                    focus:outline-none
                    sm:gap-1.5
                    sm:rounded-lg
                    sm:px-3
                    sm:py-2
                    sm:text-[11px]

                    ${
                      isActive
                        ? `
                          bg-black
                          text-white
                          shadow-[0_2px_6px_rgba(0,0,0,0.14)]
                        `
                        : `
                          text-gray-500
                          hover:bg-black/[0.04]
                          hover:text-gray-900
                        `
                    }
                  `}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>

                  <span
                    className={`
                      min-w-4
                      shrink-0
                      rounded-full
                      px-1
                      py-0.5
                      text-center
                      text-[9px]
                      font-semibold
                      leading-none
                      transition-all
                      duration-200
                      sm:min-w-[18px]
                      sm:px-1.5
                      sm:text-[9px]

                      ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-gray-200/70 text-gray-500"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ONLY THIS AREA SCROLLS */}
      <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        <ScheduleList
          bookings={bookings}
          loading={loading}
          onCancel={onCancel}
          highlightedBookingId={highlightedBookingId}
        />
      </div>

      <CancelModal
        isOpen={cancelModal}
        onClose={onClose}
        onConfirm={handleCancel}
      />
    </div>
  );
};

export default MyBookingPage;
