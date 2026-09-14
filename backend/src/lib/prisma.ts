import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";
// import { withAccelerate } from "@prisma/extension-accelerate";

const connectionString = env.DIRECT_DATABASE_URL;

if (!connectionString) {
  throw new AppError("DIRECT_DATABASE_URL is not  defined", 404);
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;

// FOR ACCELERATE READY - remove the PrismaPg*
// const prisma = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL!,
//   omit: {
//     user: {
//       passwordHash: true,
//     },
//   },
// }).$extends(withAccelerate());

// change the
