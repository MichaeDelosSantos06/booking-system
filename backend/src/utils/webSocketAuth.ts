import type { IncomingMessage } from "http";

import { verifyAccessToken } from "./jwt.js";

export const authenticateWebSocket = (req: IncomingMessage) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return null;
  }

  const accessToken = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.slice("accessToken=".length);

  if (!accessToken) {
    return null;
  }

  return verifyAccessToken(accessToken);
};
