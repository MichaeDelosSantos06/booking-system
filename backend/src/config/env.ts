import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const requiredEnvVars = [
  "DIRECT_DATABASE_URL",
  "CLIENT_URL",
  "JWT_EXPIRES_IN",
  "JWT_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "EMAIL_FROM",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not defined`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 3000,

  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL!,
  CLIENT_URL: process.env.CLIENT_URL!,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as StringValue,
  JWT_SECRET: process.env.JWT_SECRET as StringValue,

  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
  EMAIL_FROM: process.env.EMAIL_FROM!,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
} as const;
