import BookingTable from "../../feature/bookings/components/BookingTable";
import SearchInput from "../../components/ui/SearchInput";
import Input from "../../components/ui/Input";
import useFetchAdminBookings from "../../hooks/useFetchBookingAdmin";
import type { BookingStatus } from "../../types/booking.type";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import BookingService from "../../services/booking.service";
import CancelModal from "../../feature/bookings/components/CancelModal";

const BookingPage = () => {
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [cancelModal, setCancelModal] = useState(false);

  const {
    bookings,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    date,
    setDate,
    fetchBookings,
    refetch,
  } = useFetchAdminBookings();

  // Cancel Logic

  const handleCancel = (bookingId: number) => {
    setBookingId(bookingId);
    setCancelModal(true);
  };

  const onClose = () => {
    setCancelModal(false);
    setBookingId(null);
  };

  const onCancel = async () => {
    if (bookingId === null) return;

    try {
      await BookingService.cancelBooking(bookingId);
      await refetch();
      setCancelModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
        m-4
        flex
        flex-col
        gap-4
        sm:m-6
        sm:gap-5
        md:m-8
        md:gap-6
        lg:m-10
        lg:gap-5
        xl:m-12
      "
    >
      {/* Page Header */}
      <header>
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-red-600 sm:h-6" />

          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-950
              sm:text-2xl
              md:text-3xl
            "
          >
            Manage Bookings
          </h1>
        </div>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
            sm:mt-1.5
            sm:text-sm
          "
        >
          View, manage, and monitor all member bookings.
        </p>
      </header>

      {/* Search & Filters */}
      <section
        className="
          mt-1
          rounded-lg
          border
          border-slate-200
          bg-white
          p-2.5
          shadow-[0_1px_6px_rgba(0,0,0,0.04)]
          sm:mt-2
          sm:rounded-xl
          sm:p-3
          md:p-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2.5
            sm:gap-3
            lg:flex-row
            lg:items-center
          "
        >
          {/* Search */}
          <div className="min-w-0 flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by member, class..."
            />
          </div>

          {/* Filters */}
          <div
            className="
              flex
              w-full
              flex-col
              gap-2.5
              sm:flex-row
              sm:gap-3
              lg:w-auto
            "
          >
            {/* Status Filter */}
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus | "")}
              className="
                h-9
                w-full
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                px-2.5
                text-xs
                font-medium
                text-slate-600
                outline-none
                transition-all
                duration-200
                hover:border-slate-300
                hover:bg-white
                focus:border-red-400
                focus:bg-white
                focus:ring-2
                focus:ring-red-50
                sm:h-10
                sm:w-36
                sm:px-3
                sm:text-sm
              "
            >
              <option value="">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <div className="relative w-full sm:w-auto">
              <CalendarDays
                size={14}
                strokeWidth={1.8}
                className="
                  pointer-events-none
                  absolute
                  left-2.5
                  top-1/2
                  z-10
                  -translate-y-1/2
                  text-slate-400
                  sm:left-3
                "
              />

              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                  h-9
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  pl-8
                  pr-2.5
                  text-xs
                  font-medium
                  text-slate-600
                  outline-none
                  transition-all
                  duration-200
                  hover:border-slate-300
                  hover:bg-white
                  focus:border-red-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-red-50
                  sm:h-10
                  sm:w-[170px]
                  sm:pl-9
                  sm:pr-3
                  sm:text-sm
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Table */}
      <div className="min-w-0 w-full">
        <BookingTable
          bookings={bookings}
          pagination={pagination}
          onPageChange={fetchBookings}
          handleCancel={handleCancel}
        />
      </div>

      {/* Cancel Modal */}
      <div>
        <CancelModal
          isOpen={cancelModal}
          onClose={onClose}
          onConfirm={onCancel}
        />
      </div>
    </div>
  );
};

export default BookingPage;
