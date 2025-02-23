import { BetterAuthOptions } from "better-auth";

export const betterAuthOptions = {
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: ["http://localhost:3000"], // !! add your frontend URL here
  baseURL: "http://localhost:8080", // !! ADD CLOUDFLARE WORKERS VARIABLE MANAGEMENT FOR STAGING AND PRODUCTION https://developers.cloudflare.com/workers/configuration/environment-variables/
} satisfies BetterAuthOptions;
