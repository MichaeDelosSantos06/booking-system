import type { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/appError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const tokenAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized.", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
    return next(new AppError("Invalid token.", 401));
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
    return next(new AppError("Invalid or expired token.", 401));
    }

    req.user = payload;

    next();
};