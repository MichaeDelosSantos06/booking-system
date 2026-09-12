import type { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/appError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const tokenAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("Unauthorized.", 401));
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return next(new AppError("Invalid Token.", 401));
  }

  req.user = payload;

  next();
};
