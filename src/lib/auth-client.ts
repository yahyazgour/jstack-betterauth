import {
  inferAdditionalFields,
  organizationClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_HOST!,
  plugins: [
    usernameClient(),
    organizationClient(),
    /* inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }), */
    // genericOAuthClient(),
    // adminClient(),
    /* twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor";
      },
    }), */
    // passkeyClient(),
    // multiSessionClient(),
    /* oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    }), */
    // oidcClient(),
    // magicLinkClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});
