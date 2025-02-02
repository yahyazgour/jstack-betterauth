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

  "sign-in/social": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "sign-up/email": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "forget-password": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "reset-password": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "verify-email": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "send-verification-email": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "change-email": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "change-password": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "update-user": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "delete-user": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "reset-password/:token": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "list-sessions": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "revoke-session": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "revoke-sessions": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "revoke-other-sessions": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "link-social": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "list-accounts": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "delete-user/callback": publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  "unlink-account": publicProcedure.mutation(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  ok: publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),

  error: publicProcedure.query(async ({ c, ctx }) => {
    return ctx.auth.handler(c.req.raw);
  }),
});
