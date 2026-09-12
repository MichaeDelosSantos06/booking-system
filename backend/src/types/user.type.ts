export interface CreateUserDto {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ResetTokenDto {
  userId: number;
  tokenHash: string;
  expiresAt: Date;
}

export interface UpdateProfileDto {
  name: string;
  contact: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
