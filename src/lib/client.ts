import { createClient } from "jstack";
import type { AppRouter } from "@/server";

export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
});

function getBaseUrl() {
  // 👇 In production, use the production worker
  if (process.env.NODE_ENV === "production") {
    return "https://<YOUR_DEPLOYMENT>.workers.dev";
  }

  // 👇 Locally, use wrangler backend
  return `http://localhost:3000`;
}
