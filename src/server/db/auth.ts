// !! do not use, this is just for generating the schema

/* import { createClient } from "@libsql/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import { betterAuthOptions } from "./auth-options";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(turso);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  ...betterAuthOptions(
    process.env.BETTER_AUTH_URL!,
    process.env.BETTER_AUTH_SECRET!,
    process.env.CLIENT_HOST!,
  ),
}); */
