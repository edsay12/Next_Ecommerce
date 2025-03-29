import {
  cartItemSchema,
  cartSchema,
  InsertOrderItemSchema,
  InsertOrderSchema,
  paymentMethodSchema,
  productSchema,
  shippingSchema,
} from "@/lib/validator";
import { OrderItem } from "@prisma/client";

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
export type ShipingAdress = z.infer<typeof shippingSchema>;

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type InsertOrder = z.infer<typeof InsertOrderItemSchema>;
export type InsertOrderItem = z.infer<typeof InsertOrderSchema> & { 
  id:string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  OrderItem: OrderItem[];
};