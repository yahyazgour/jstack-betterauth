import { BetterAuthOptions } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { openAPI, organization, username } from "better-auth/plugins";

export const betterAuthOptions = (
  betterAuthUrl: string,
  betterAuthSecret: string,
  clientHost: string,
  discordClientId: string,
  discordClientSecret: string,
  twitchClientId: string,
  twitchClientSecret: string,
  googleClientId: string,
  googleClientSecret: string,
) => {
  return {
    appName: "discord-opgg",
    baseURL: betterAuthUrl,
    secret: betterAuthSecret,
    trustedOrigins: [clientHost],
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
      freshAge: 0,
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
    },
    rateLimit: {
      window: 60, // time window in seconds
      max: 100, // max requests in the window
      storage: "database",
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true,
        // httpOnly: true,
      },
      cookiePrefix: "discord-opgg",
    },
    user: {
      changeEmail: {
        enabled: true,
      },
      deleteUser: {
        enabled: true,
      },
      /* additionalFields: {
        role: {
          type: "string",
        },
      }, */
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      /* async sendResetPassword({ user, url }) {
        await resend.emails.send({
          from,
          to: user.email,
          subject: "Reset your password",
          react: reactResetPasswordEmail({
            username: user.email,
            resetLink: url,
          }),
        });
      }, */
    },
    emailVerification: {
      // sendOnSignUp: true,
      // autoSignInAfterVerification: true,
      /* async sendVerificationEmail({ user, url }) {
        const res = await resend.emails.send({
          from,
          to: to || user.email,
          subject: "Verify your email address",
          html: `<a href="${url}">Verify your email address</a>`,
        });
        console.log(res, user.email);
      }, */
    },
    account: {
      accountLinking: {
        trustedProviders: [
          "discord",
          "twitch",
          "google",
          /* "github",
          "facebook",
          "microsoft",
          "twitter",
          "demo-app", */
        ],
      },
    },
    socialProviders: {
      discord: {
        clientId: discordClientId || "",
        clientSecret: discordClientSecret || "",
      },
      twitch: {
        clientId: twitchClientId || "",
        clientSecret: twitchClientSecret || "",
      },
      google: {
        clientId: googleClientId || "",
        clientSecret: googleClientSecret || "",
      },
      /* github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
      facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID || "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      },
      microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID || "",
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      },
      twitter: {
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }, */
    },
    plugins: [
      username({
        minUsernameLength: 5,
        maxUsernameLength: 25,
      }),
      nextCookies(),
      openAPI(),
      organization({
        schema: {
          organization: {
            fields: {},
          },
        },
        /* async sendInvitationEmail(data) {
          await resend.emails.send({
            from,
            to: data.email,
            subject: "You've been invited to join an organization",
            react: reactInvitationEmail({
              username: data.email,
              invitedByUsername: data.inviter.user.name,
              invitedByEmail: data.inviter.user.email,
              teamName: data.organization.name,
              inviteLink:
              process.env.NODE_ENV === "development"
              ? `http://localhost:3000/accept-invitation/${data.id}`
              : `${
                process.env.BETTER_AUTH_URL || "https://demo.better-auth.com"
              }/accept-invitation/${data.id}`,
            }),
          });
        }, */
      }),
      // oAuthProxy(),
      /* genericOAuth({
        config: [
          {
            providerId: "provider-id",
            clientId: "test-client-id",
            clientSecret: "test-client-secret",
            discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
            authorizationUrl: "https://slack.com/oauth/v2/authorize",
            tokenUrl: "https://slack.com/api/oauth.v2.access",
            scopes: ["users:read", "users:read.email"],
          },
        ],
      }), */
      /* twoFactor({
        otpOptions: {
          async sendOTP({ user, otp }) {
            await resend.emails.send({
              from,
              to: user.email,
              subject: "Your OTP",
              html: `Your OTP is ${otp}`,
            });
          },
        },
      }), */
      /* magicLink({
        sendMagicLink: async ({ email, token, url }, request) => {},
      }), */
      // passkey(),
      // bearer(),
      // admin(),
      // multiSession(),
      // oneTap(),
      /* oidcProvider({
        loginPage: "/sign-in",
      }), */
    ],
  } satisfies BetterAuthOptions;
};
