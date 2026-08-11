import dotenv from "dotenv";

dotenv.config();

// Add REQUIRED VARIABLES later if needed.
const requiredEnvVars = [
  "DATABASE_URL",
  "CLIENT_URL",
  "JWT_SECRET",
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
} as const;