import type { Request, Response, NextFunction } from "express";
import { Role } from "../generated/prisma/client.js";
import { AppError } from "../utils/appError.js";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  if (req.user.role !== Role.Admin) {
    return next(new AppError("Access denied", 403));
  }

  next();
};
