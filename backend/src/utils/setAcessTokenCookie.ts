import type { Response } from "express";
import { env } from "../config/env.js";

import ms from "ms";

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ms(env.JWT_EXPIRES_IN),
  });
};
