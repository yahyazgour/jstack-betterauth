import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* export function getJstackBaseUrl() {
  // 👇 In production, use the production worker
  if (process.env.NODE_ENV === "production") {
    return process.env.JSTACK_BASE_URL_PRODUCTION;
  }

  // 👇 Locally, use wrangler backend
  return process.env.JSTACK_BASE_URL_DEVELOPMENT;
} */
