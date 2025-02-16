import { PrismaClient } from "@prisma/client";
import sampleData from "./mock-products";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Seeding complete");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 