export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  bookings: number;
  status: "Active" | "Inactive";
  role: "Admin" | "Member";
  _count: {
    bookings: number;
  };
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export type ResetPasswordDto = {
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordDto = {
  email: string;
};
