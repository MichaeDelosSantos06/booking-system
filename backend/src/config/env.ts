import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "CLIENT_URL",
  "JWT_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "EMAIL_FROM",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not defined`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 3000,

  DATABASE_URL: process.env.DATABASE_URL!,
  CLIENT_URL: process.env.CLIENT_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,

  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
} as const;
