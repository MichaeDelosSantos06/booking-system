import type { UpdateProfileFormData } from "../schema/user.schema";
import type { ChangePasswordFormData } from "../schema/user.schema";

type Status = "Active" | "Inactive";

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

export interface ResetPasswordDto {
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

// Update Profile
export interface UpdateProfileDto {
  name: string;
  contact: string;
}

// Change Password
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Profile Props
export interface ProfileResponseDto {
  id: number;
  name: string;
  email: string;
  status: Status;
  contact: string;
  createdAt: string;
}

export interface ProfileData {
  userData: ProfileResponseDto | null;
  loading: boolean;
  onEdit: () => void;
  isEditing: boolean;
  isSubmitting: boolean;
  onSubmitProfile: (data: UpdateProfileFormData) => Promise<void>;
  onCancelProfile: () => void;
  onChangePassword: () => void;
  isChangingPassword: boolean;
  passwordSubmitting: boolean;
  passwordError: string | null;
  onSubmitPassword: (data: ChangePasswordFormData) => Promise<void>;
  onCancelPassword: () => void;
}
