export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Fast Store";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A store that lets you buy anything";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const PAYMENT_METHODS = ["PayPal", "Stripe", "MercadoPago"];
export const DEFAULT_PAYMENT_METHOD = PAYMENT_METHODS[0];
