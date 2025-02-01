import { posts } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { authenticatedProcedure, j, publicProcedure } from "../jstack";

export const postRouter = j.router({
  list: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const postsList = await db.select().from(posts);

    return c.superjson(postsList);
  }),

  recent: publicProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const [recentPost] = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(1);

    return c.superjson(recentPost ?? null);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, c, input }) => {
      const { name } = input;
      const { db } = ctx;

      const now = new Date();
      const post = await db.insert(posts).values({
        name,
        createdAt: now,
        updatedAt: now,
      });

      return c.superjson(post);
    }),

  "delete-all": publicProcedure.mutation(async ({ c, ctx }) => {
    // delete all posts in db
    const { db } = ctx;
    await db.delete(posts);
    return c.superjson({ message: "All posts deleted" });
  }),

  "protected-list": authenticatedProcedure.query(async ({ c, ctx }) => {
    const { db } = ctx;

    const postsList = await db.select().from(posts);

    return c.superjson(postsList);
  }),
});
