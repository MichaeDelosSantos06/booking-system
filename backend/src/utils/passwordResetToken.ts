import crypto from "node:crypto";

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const hashResetToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
