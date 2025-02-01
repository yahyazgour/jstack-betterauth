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

console.log(
  "--------------------------------------------------------------------------------------------------"
);

let dbInstance: ReturnType<typeof drizzle>;
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  if (!dbInstance) {
    const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env(c);
    const turso = createClient({
      url: TURSO_DATABASE_URL!,
      authToken: TURSO_AUTH_TOKEN,
    });
    dbInstance = drizzle(turso, { schema });
    console.log("Database instance created:");
  } else {
    console.log("Reusing existing database instance:", c.req.path);
  }

  return await next({ db: dbInstance });
});

type AuthMiddlewareOutput = InferMiddlewareOutput<typeof databaseMiddleware>;

let authInstance: ReturnType<typeof betterAuth>;
const authMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { db } = ctx as AuthMiddlewareOutput;

  if (!authInstance) {
    authInstance = betterAuth({
      database: drizzleAdapter(db, {
        provider: "sqlite",
      }),
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
    console.log("Auth instance created:");
  } else {
    console.log("Reusing existing auth instance:", c.req.path);
  }

  return await next({ auth: authInstance });
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

export const publicProcedure = j.procedure
  .use(databaseMiddleware)
  .use(authMiddleware);

export const authenticatedProcedure = publicProcedure.use(
  authenticationMiddleware
);
