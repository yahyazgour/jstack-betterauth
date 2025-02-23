import { createClient } from "@libsql/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { InferMiddlewareOutput, jstack } from "jstack";
import { betterAuthOptions } from "./db/auth-options";
import * as schema from "./db/schema";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

interface Env {
  Bindings: {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    BETTER_AUTH_URL: string;
    BETTER_AUTH_SECRET: string;
  };
}

export const j = jstack.init<Env>();

/* const corsMiddleware = j.fromHono(cors()); */

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
  return await next({ auth });
});

const authenticationMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { auth } = ctx as InferMiddlewareOutput<typeof authMiddleware>;
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    throw new HTTPException(401, {
      message: "Unauthenticated, sign in to continue.",
    });
  }
  return await next({ session });
});

/* ----------------------------------------------------------------------------- */
/*                               Procedures                                      */
/* ----------------------------------------------------------------------------- */
export const publicProcedure = j.procedure.use(databaseMiddleware).use(authMiddleware);
export const authenticatedProcedure = publicProcedure.use(authenticationMiddleware);
// authorization middleware (ownership, organizations)
// paywall middleware (premium users)
// sudo middleware (admin users)
// rate limit middleware
// error handling middleware
// logging middleware
// etc ..
