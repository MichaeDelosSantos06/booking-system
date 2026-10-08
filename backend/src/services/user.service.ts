import UserRepository from "../repositories/user.repository.js";
import type {
  CreateUserDto,
  LoginDto,
  UpdateProfileDto,
  ChangePasswordDto,
} from "../types/user.type.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { fetchUserByWeek } from "../utils/newUserByWeek.js";
import { deleteCache, getCache, setCache } from "../utils/redisCache.js";

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

    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    return {
      accessToken,
      refreshToken,
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

    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  getCurrentUser: async (id: number) => {
    const cacheKey = `user:id:${id}`;

    const cachedUser = await getCache(cacheKey);
    if (cachedUser !== null) {
      console.log("cache HIT", cachedUser);

      return cachedUser;
    }

    console.log("cache MISS");

    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await setCache(cacheKey, user, 60);

    return user;
  },

  // refresh token
  refreshAccessToken: async (refreshToken: string | undefined) => {
    if (!refreshToken) {
      throw new AppError("Refresh token not found!", 401);
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new AppError("Inavlid or Expired refresh token", 401);
    }

    const user = await UserRepository.findById(payload.id);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return accessToken;
  },

  getUsers: async (page = 1, limit = 8, search = "") => {
    const currentPage = Math.max(1, page);
    const pageSize = Math.min(Math.max(1, limit), 50);
    const searchTerm = search.trim();

    const { users, total } = await UserRepository.getUsers(
      currentPage,
      pageSize,
      searchTerm || undefined,
    );

    return {
      users,
      total,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  },

  fetchNewUserByWeek: async () => {
    const { startOfWeek, endOfWeek } = fetchUserByWeek();

    return UserRepository.fetchNewUserByWeek(startOfWeek, endOfWeek);
  },

  getTotalUser: async () => {
    return UserRepository.getTotalUser();
  },

  getUserInfo: async (userId: number) => {
    const cacheKey = `user:userInfo:${userId}`;

    const cachedUserInfo = await getCache(cacheKey);
    if (cachedUserInfo !== null) {
      console.log("cache HIT", cachedUserInfo);

      return cachedUserInfo;
    }

    console.log("cache MISS");

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userInfo = await UserRepository.getUserInfo(userId);

    await setCache(cacheKey, userInfo, 60);

    return userInfo;
  },

  updateProfile: async (userId: number, data: UpdateProfileDto) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userProfile = UserRepository.updateProfile(userId, data);

    await deleteCache(`user:userInfo:${userId}`);

    return userProfile;
  },

  changePassword: async (userId: number, data: ChangePasswordDto) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Mirrors the login flow: email is unique, so use it to fetch the
    // registered (already hashed) password for comparison. The hash is only
    // held in server memory here and is never returned to the client.
    const account = await UserRepository.findByEmail(user.email);
    if (!account) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(
      data.currentPassword,
      account.passwordHash,
    );
    if (!isMatch) {
      throw new AppError("Current password is incorrect", 400);
    }

    const passwordHashed = await bcrypt.hash(data.newPassword, 12);

    await UserRepository.updatePassword(userId, passwordHashed);
  },
};

export default UserService;
