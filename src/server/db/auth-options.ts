import { BetterAuthOptions } from "better-auth";
import { Env } from "../jstack";

export const betterAuthOptions = (
  clientHost: Env["Bindings"]["CLIENT_HOST"],
  betterAuthUrl: Env["Bindings"]["BETTER_AUTH_URL"],
  betterAuthSecret: Env["Bindings"]["BETTER_AUTH_SECRET"],
) => {
  return {
    user: {
      additionalFields: {
        role: {
          type: "string",
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
      freshAge: 60 * 5,
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60 // Cache duration in seconds
      },
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true,
        // httpOnly: true,
      },
      cookiePrefix: "my-app",
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins: [clientHost],
    baseURL: betterAuthUrl,
    secret: betterAuthSecret,
  } satisfies BetterAuthOptions;
};
