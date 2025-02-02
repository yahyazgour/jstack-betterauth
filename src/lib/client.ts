import type { AppRouter } from "@/server";
import { createClient } from "jstack";

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */

export const client = createClient<AppRouter>({
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.JSTACK_API_URL || "https://yourdomain.com/api",
});
