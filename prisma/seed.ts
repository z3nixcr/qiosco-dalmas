import { PrismaClient } from "@/app/generated/prisma";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  // Create categories and products
  try {
    await prisma.category.createMany({
      data: categories,
    });

    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.error(
      "Error creating categories and products:",
      error
    );
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
