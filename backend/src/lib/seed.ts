// import bcrypt from "bcrypt";
// import { env } from "../config/env.js";
// import prisma from "./prisma.js";

// async function main() {
//   const email = env.SEED_ADMIN_USER!;
//   const password = env.SEED_ADMIN_PASS!;

//   const hashedPassword = await bcrypt.hash(password, 12);

//   await prisma.user.upsert({
//     where: {
//       email,
//     },
//     update: {},
//     create: {
//       name: "Admin Ky",
//       email,
//       passwordHash: hashedPassword,
//       contact: "09917279195",
//       role: "Admin",
//       status: "Active",
//     },
//   });

//   console.log("Admin account seeded successfully.");
// }

// main()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
