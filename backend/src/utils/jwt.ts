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
