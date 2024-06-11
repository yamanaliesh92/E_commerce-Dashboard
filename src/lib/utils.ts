import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const formatter = new Intl.NumberFormat("en_US", {
//   style: "currency",
//   currency: "USD",
// });
