import { createClient } from "@libsql/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { InferMiddlewareOutput, jstack } from "jstack";
import * as schema from "./db/schema";

interface Env {
  Bindings: {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
  };
}

export const j = jstack.init<Env>();

/**
 * Type-safely injects database into all procedures
 *
 * @see https://jstack.app/docs/backend/middleware
 */

let db: ReturnType<typeof drizzle>;
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  if (!db) {
    const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env(c);
    const turso = createClient({
      url: TURSO_DATABASE_URL!,
      authToken: TURSO_AUTH_TOKEN,
    });
    db = drizzle(turso, { schema });
  }
  return await next({ db: db });
});

type AuthMiddlewareOutput = InferMiddlewareOutput<typeof databaseMiddleware>;

export let auth: ReturnType<typeof betterAuth>;
const authMiddleware = j.middleware(async ({ ctx, next }) => {
  const { db } = ctx as AuthMiddlewareOutput;

  if (!auth) {
    auth = betterAuth({
      database: drizzleAdapter(db, {
        provider: "sqlite",
      }),
      /* user: {
        additionalFields: {
          role: {
            type: "string",
          },
        },
      }, */
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
    });
  }
  return await next({ auth: auth });
});

type AuthenticationMiddlewareOutput = InferMiddlewareOutput<
  typeof authMiddleware
>;

const authenticationMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { auth } = ctx as AuthenticationMiddlewareOutput;
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    });
  }
  return await next({ session });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */

export type Session = typeof auth.$Infer.Session;

export const publicProcedure = j.procedure
  .use(databaseMiddleware)
  .use(authMiddleware);

export const authenticatedProcedure = publicProcedure.use(
  authenticationMiddleware
);

// add authorization middleware (organizations)
// add paywall middleware (premium users)
// add sudo middleware (admin users)
