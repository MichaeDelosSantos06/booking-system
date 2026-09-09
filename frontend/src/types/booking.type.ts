import type { Pagination } from "./pagination.type";

type Location =
  | "StudioA"
  | "StudioB"
  | "CyclingStudio"
  | "MainFloor"
  | "WeightRoom"
  | "BoxingRing"
  | "OutdoorCourt";

type TrainerStatus = "Active" | "Inactive";

export type BookingStatus = "Completed" | "Confirmed" | "Cancelled";
export type BookingTabs = "All" | BookingStatus;

export interface BookingResponseDto {
  id: number;
  status: BookingStatus;
  bookedAt: string;

  trainer: {
    name: string;
  };

  schedule: {
    startAt: string;
    endAt: string;
    date: string;
    location: Location;

    class: {
      imageUrl: string;
      className: string;
      description: string;
    };
  };
}

export interface BookingCounts {
  all: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

// SchduleList Props
export interface ScheduleListProps {
  bookings: BookingResponseDto[];
  onCancel: (bookingId: number) => void;
  loading: boolean;
}

// Cancel Modal Props
export interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

// BookingDto for admin
export interface BookingsResponseDto {
  id: number;
  status: BookingStatus;

  user: {
    name: string;
    email: string;
  };

  schedule: {
    date: string;
    startAt: string;
    endAt: string;
    class: {
      className: string;
    };
  };

  trainer: {
    status: TrainerStatus;
    name: string;
  };
}

export interface BookingTableProps {
  bookings: BookingsResponseDto[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  handleCancel: (bookingId: number) => void;
  loading: boolean;
}

export interface BookingDataResponseDto {
  bookings: BookingsResponseDto[];
  pagination: Pagination;
}

export interface BookingSearchParams {
  search?: string;
  page?: number;
  limit?: number;
  status?: BookingStatus;
  date?: string;
}

// Recent Book Dto
export interface RecentBookingResponseDto {
  id: string;
  bookedAt: string;
  user: {
    name: string;
  };

  schedule: {
    class: {
      className: string;
    };
  };
}

export interface RecentBookingDto {
  bookings: RecentBookingResponseDto[];
  loading: boolean;
}

// graph stat Dto
export interface BookingGraphStat {
  date: string;
  total: number;
}

export interface GraphResponseDto {
  bookingStat: BookingGraphStat[];
  loading: boolean;
}
