import { PrismaClient } from "@/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

export default prisma;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient;
// };

// // Extend Prisma with Accelerate (only once globally)
// const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;
