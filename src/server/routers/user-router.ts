import { account, user } from "@/server/db/schema";
import { j, publicProcedure } from "../jstack";
import { eq } from "drizzle-orm";

export const usersRouter = j.router({
  list: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const usersList = await db.select().from(user);
    return c.superjson(usersList);
  }),

  ":userId": publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const testUser = await db
      .select()
      .from(user)
      .where(eq(user.id, c.req.param("userId")));
    return c.superjson(testUser);
  }),

  ":userId/accounts": publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;
    const userAccounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, c.req.param("userId")));

    return c.superjson(userAccounts);
  }),
});

// name rouer based on ressource fetched, like /accounts/:userId, /accounts/:gameId/:userId, /accounts/:gameId/:serverId
// instead of doing it dynamically like this, every endpoint can be a 2 level router /api/something/somethingelse like shopify collections or products.
// the frontend routes can reflect dynamic params, which we can grab, and then add as input ot the procedure, like in accouns router, we can have procedures
// "user-server": publicProcedure.query(async ({ c, ctx }) => {
//   const { db } = ctx;
//   const userServer = await db
//     .select()
//     .from(server)
//     .where(eq(server.userId, c.req.param("userId")));
/* "user-game": publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ c, ctx, input }) => {
      const { db } = ctx;
      const userAccounts = await db
        .select()
        .from(account)
        .where(eq(account.userId, input.userId));
      return c.superjson(userAccounts);
    }), */

// use this instead /api/servers/:serverId/games/:gameId/accounts

// maybe we can combine /api/users/:userId/accounts with /api/servers/:serverId/accounts/games/:gameId by using the game only in query param ?game= since there is a seperate model for each game and if empty default to all
