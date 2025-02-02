import { authInstance } from "@/server/jstack";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BETTER_AUTH_URL || "https://yourdomain.com",
  plugins: [inferAdditionalFields<typeof authInstance>()],
});

// type Session = typeof authClient.$Infer.Session;
