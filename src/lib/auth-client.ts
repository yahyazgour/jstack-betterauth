import type { Auth } from "@/server/jstack";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseUrl: `${getBaseUrl()}`,
  plugins: [inferAdditionalFields<Auth>()],
});

function getBaseUrl() {
  // 👇 Adjust for wherever you deploy
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`;
}

// type Session = typeof authClient.$Infer.Session;
