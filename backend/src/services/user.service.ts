import UserRepository from "../repositories/user.repository.js";
import type { CreateUserDto, LoginDto } from "../types/user.type.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";

const UserService = {
  registerUser: async (data: CreateUserDto) => {
    const { name, email, contact, password } = data;

    // Check registered email
    const checkEmail = await UserRepository.findByEmail(email);
    if (checkEmail) {
      throw new AppError("Email already exist", 400);
    }

    const saltRounds = 12;
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    const user = await UserRepository.registerUser({
      name,
      email,
      contact,
      passwordHash: passwordHashed,
    });

    const token = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  },

  loginUser: async (data: LoginDto) => {
    const { email, password } = data;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect Credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Incorrect Credentials", 401);
    }

    const token = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  },

  getCurrentUser: async (id: number) => {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },
};

export default UserService;
