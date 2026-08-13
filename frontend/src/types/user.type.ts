export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Member";
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
