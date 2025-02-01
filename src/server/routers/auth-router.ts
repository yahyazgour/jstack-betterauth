import { publicProcedure, j } from "../jstack";

export const authRouter = j.router({
  "get-session": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "sign-in/email": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "sign-out": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),
});
