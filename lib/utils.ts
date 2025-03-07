import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function convertNumberToDecimal(value: number): string {
  const [int, decimal] = value.toString().split(".");
  return decimal ? `${int}.${decimal}` : `${int}.00`;
}

//Farmat Erros
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    const { issues } = error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors = issues.map((issue: any) => issue.message);
    return errors.join(", ");
  } else if (
    (error.name === "PrismaClientKnownRequestError", error.code === "P2002")
  ) {
    return "Ja tem uma conta com esse email";
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function round2(value: number | string) {
  if (typeof value === "string") {
    return Math.round(( Number(value) + Number.EPSILON) * 100) /100
  } else if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) /100
  } else throw new Error("value não é um número");
}
