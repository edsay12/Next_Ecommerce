"use server";

import { db } from "@/db/db";

// get products
export async function getLatestProducts() {
  const products = await db.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}
