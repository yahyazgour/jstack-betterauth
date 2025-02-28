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
    trustedOrigins: [clientHost],
    baseURL: betterAuthUrl,
    secret: betterAuthSecret,
  } satisfies BetterAuthOptions;
};
