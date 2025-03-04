import { cartItemSchema, cartSchema, productSchema } from "@/lib/validator";

import { z } from "zod";

export type Product = z.infer<typeof productSchema> & {
  id: string;
  rating: number;
  numReviews: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
