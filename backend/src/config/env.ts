import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const requiredEnvVars = [
  "DIRECT_DATABASE_URL",
  "CLIENT_URL",

  "JWT_EXPIRES_IN",
  "JWT_SECRET",

  "REFRESH_TOKEN_EXPIRES_IN",
  "REFRESH_TOKEN_SECRET",

  // "SEED_ADMIN_USER",
  // "SEED_ADMIN_PASS",

  "EMAIL_FROM",
  "BREVO_API_KEY",

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

  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as StringValue,

  // SEED_ADMIN_USER: process.env.SEED_ADMIN_USER!,
  // SEED_ADMIN_PASS: process.env.SEED_ADMIN_PASS!,

  EMAIL_FROM: process.env.EMAIL_FROM!,
  BREVO_API_KEY: process.env.BREVO_API_KEY!,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
} as const;
