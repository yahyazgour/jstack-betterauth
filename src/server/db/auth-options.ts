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
} satisfies BetterAuthOptions;
