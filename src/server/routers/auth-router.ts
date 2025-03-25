import { publicProcedure, j } from "../jstack";

const createAuthHandler = (method: "query" | "mutation") =>
  publicProcedure[method](async ({ c, ctx }) => ctx.auth.handler(c.req.raw));

export const authRouter = j.router({
  // Session related
  "get-session": createAuthHandler("query"),
  "list-sessions": createAuthHandler("query"),

  // Authentication
  "sign-in/email": createAuthHandler("mutation"),
  "sign-in/social": createAuthHandler("mutation"),
  "sign-up/email": createAuthHandler("mutation"),
  "sign-out": createAuthHandler("mutation"),

  // Password management
  "forget-password": createAuthHandler("mutation"),
  "reset-password": createAuthHandler("mutation"),
  "reset-password/:token": createAuthHandler("query"),
  "change-password": createAuthHandler("mutation"),

  // Email verification
  "verify-email": createAuthHandler("query"),
  "send-verification-email": createAuthHandler("mutation"),
  "change-email": createAuthHandler("mutation"),

  // Sessions management
  "revoke-session": createAuthHandler("mutation"),
  "revoke-sessions": createAuthHandler("mutation"),
  "revoke-other-sessions": createAuthHandler("mutation"),

  // Social accounts
  "list-accounts": createAuthHandler("query"),
  "link-social": createAuthHandler("mutation"),
  "unlink-account": createAuthHandler("mutation"),

  // User management
  "update-user": createAuthHandler("mutation"),
  "delete-user": createAuthHandler("mutation"),
  "delete-user/callback": createAuthHandler("query"),

  // Utility
  ok: createAuthHandler("query"),
  error: createAuthHandler("query"),

  // Organization management
  "organization/create": createAuthHandler("mutation"),
  "organization/update": createAuthHandler("mutation"),
  "organization/delete": createAuthHandler("mutation"),
  "organization/set-active": createAuthHandler("mutation"),
  "organization/get-full-organization": createAuthHandler("query"),
  "organization/list": createAuthHandler("query"),
  "organization/check-slug": createAuthHandler("mutation"),

  // Organization membership
  "organization/get-active-member": createAuthHandler("query"),
  "organization/leave": createAuthHandler("mutation"),
  "organization/has-permission": createAuthHandler("mutation"),

  // Invitations
  "organization/invite-member": createAuthHandler("mutation"),
  "organization/cancel-invitation": createAuthHandler("mutation"),
  "organization/accept-invitation": createAuthHandler("mutation"),
  "organization/get-invitation": createAuthHandler("query"),
  "organization/reject-invitation": createAuthHandler("mutation"),

  // Member management
  "organization/remove-member": createAuthHandler("mutation"),
  "organization/update-member-role": createAuthHandler("mutation"),

  // Oauth-proxy
  "oauth-proxy-callback": createAuthHandler("query"),
});

/* export const authRouter = j.router({
  "get-session": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "sign-in/email": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "sign-out": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "sign-in/social": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "sign-up/email": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "forget-password": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "reset-password": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "verify-email": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "send-verification-email": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "change-email": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "change-password": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "update-user": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "delete-user": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "reset-password/:token": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "list-sessions": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "revoke-session": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "revoke-sessions": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "revoke-other-sessions": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "link-social": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "list-accounts": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "delete-user/callback": publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  "unlink-account": publicProcedure.mutation(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),

  ok: publicProcedure.query(async ({ c, ctx }) => ctx.auth.handler(c.req.raw)),

  error: publicProcedure.query(async ({ c, ctx }) =>
    ctx.auth.handler(c.req.raw)
  ),
});
 */
