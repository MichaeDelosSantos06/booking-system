import type { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import UserService from "../services/user.service.js";
import type { CreateUserDto, LoginDto } from "../types/user.type.js";
import { setAccessTokenCookie } from "../utils/setAcessTokenCookie.js";

const UserController = {
  registerUser: asyncHandler(async (req: Request, res: Response) => {
    const data: CreateUserDto = req.body;

    const { token } = await UserService.registerUser(data);

    setAccessTokenCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  }),

  loginUser: asyncHandler(async (req: Request, res: Response) => {
    const data: LoginDto = req.body;

    const { token } = await UserService.loginUser(data);

    setAccessTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Successfully Logged In!",
    });
  }),

  getCurrentUser: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await UserService.getCurrentUser(userId);

    return res.status(200).json({
      success: true,
      user: user,
    });
  }),

  logoutUser: asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successfully!",
    });
  }),

  getUsers: asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const user = await UserService.getUsers(page, limit, search);
    return res.status(200).json({
      success: true,
      message: "User Retrieve Succesfully!",
      user,
      pagination: user.pagination,
    });
  }),

  fetchNewUserByWeek: asyncHandler(async (req: Request, res: Response) => {
    const count = await UserService.fetchNewUserByWeek();
    return res.status(200).json({
      success: true,
      message: "Count Retrieve",
      user: count,
    });
  }),

  getTotalUser: asyncHandler(async (req: Request, res: Response) => {
    const totalUser = await UserService.getTotalUser();
    return res.status(200).json({
      success: true,
      message: "Retrieve total user siccessfully",
      totalUser,
    });
  }),
};

export default UserController;
