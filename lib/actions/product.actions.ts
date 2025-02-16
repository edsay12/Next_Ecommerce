"use server";

import { Product } from "@/@types";
import db  from "@/db/db";

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



export async function getProductBySlug(slug:string):Promise<Product> {
  const product = await db.product.findFirst({
    where: {
      slug: slug,
    },
  })

  return JSON.parse(JSON.stringify(product));

}