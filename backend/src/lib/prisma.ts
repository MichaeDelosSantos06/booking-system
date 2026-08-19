import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
// import { withAccelerate } from "@prisma/extension-accelerate";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_DATABASE_URL!,
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
