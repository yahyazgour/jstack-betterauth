import { createClient } from "@libsql/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { InferMiddlewareOutput, jstack } from "jstack";
import { betterAuthOptions } from "./db/auth-options";
import * as schema from "./db/schema";

interface Env {
  Bindings: {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
  };
}

export const j = jstack.init<Env>();

const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = env(c);

  const turso = createClient({
    url: TURSO_DATABASE_URL!,
    authToken: TURSO_AUTH_TOKEN!,
  });
  const db = drizzle(turso, { schema });

  return await next({ db });
});

const authMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { db } = ctx as InferMiddlewareOutput<typeof databaseMiddleware>;

  const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    ...betterAuthOptions,
  });

  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  return await next({ auth, session });
});

export type Auth = InferMiddlewareOutput<typeof authMiddleware>["auth"];
export type Session = InferMiddlewareOutput<typeof authMiddleware>["session"];

const authenticationMiddleware = j.middleware(async ({ ctx, next }) => {
  const { session } = ctx as InferMiddlewareOutput<typeof authMiddleware>;

  if (!session) {
    throw new HTTPException(401, {
      message: "Unauthenticated, sign in to continue.",
    });
  }

  return await next({ session, user: session.user });
});

export type User = InferMiddlewareOutput<typeof authenticationMiddleware>["user"];

/* ----------------------------------------------------------------------------- */
/*                               Procedures                               */
/* ----------------------------------------------------------------------------- */
export const publicProcedure = j.procedure.use(databaseMiddleware).use(authMiddleware);
export const authenticatedProcedure = publicProcedure.use(authenticationMiddleware);
// authorization middleware (ownership, organizations)
// paywall middleware (premium users)
// sudo middleware (admin users)
