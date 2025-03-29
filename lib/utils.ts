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
    const errors = await issues.map((issue: any) => issue.message);
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
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else throw new Error("value não é um número");
}

function CurencyFormatINTL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function CurencyFormat(value: number | string | null) {
  if (value === null) return "0,00";
  if (typeof value === "string") {
    return CurencyFormatINTL(Number(value));
  } else if (typeof value === "number") {
    return CurencyFormatINTL(value);
  }
}

// shorten UUID
export function shortenUuid(uuid: string) {
  return uuid.substring(0, 8) + "..." + uuid.substring(uuid.length - 4);
}

// Formate date and times to pt-BR
export function formatDate(date: Date) {
  const dateTime: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formatDate = new Intl.DateTimeFormat("pt-BR", dateTime).format(date);
  const formatTime = new Intl.DateTimeFormat("pt-BR", timeOptions).format(date);
  const formatDateTime = new Intl.DateTimeFormat("pt-BR", dateOptions).format(date);

  return {
    dateTime: formatDate,
    timeOnly: formatTime,
    dateOnly: formatDateTime,
  };
}


const data  = new Date()

console.log(formatDate(data).dateOnly)

