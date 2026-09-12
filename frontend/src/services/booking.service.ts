import { api } from "../api/axios";
import type { CreateBookingDto } from "../schema/booking.schema";
import type { BookingSearchParams, BookingStatus } from "../types/booking.type";

const BookingService = {
  createBooking: async (data: CreateBookingDto) => {
    const result = await api.post("/booking/create", data);
    return result.data;
  },

  getAllBookings: async (status?: BookingStatus, take?: number) => {
    const result = await api.get("/booking/my-bookings", {
      params: {
        status,
        take,
      },
    });
    return result.data;
  },

  cancelBooking: async (bookingId: number) => {
    const result = await api.patch(`/booking/cancel/${bookingId}`);
    return result.data;
  },

  retrieveBookingForAdmin: async (params: BookingSearchParams) => {
    const result = await api.get("/booking", { params });
    return result.data;
  },

  getRecentBookings: async () => {
    const result = await api.get("/booking/recent-book");
    return result.data;
  },

  gerStatBookingForGraph: async () => {
    const result = await api.get("/booking/book-stat");
    return result.data;
  },
};

export default BookingService;
