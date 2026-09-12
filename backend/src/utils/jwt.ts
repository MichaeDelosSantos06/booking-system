import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import { env } from "../config/env.js";
import type { Role } from "../generated/prisma/client.js";

// Add line if needed (eg., ROLE  or isVerified)
export interface TokenPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
  role: Role;
}

// when access token being genrated it automatically sign by secret
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

// Refresh Token
export const generateRefreshToken = (
  payload: Pick<TokenPayload, "id">,
): string => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyRefreshToken = (
  token: string,
): Pick<TokenPayload, "id"> | null => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as Pick<
      TokenPayload,
      "id"
    >;
  } catch {
    return null;
  }
};
