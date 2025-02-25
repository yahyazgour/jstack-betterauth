// import { cors } from "hono/cors";
import { cors } from "hono/cors";
import { j } from "./jstack";
import { authRouter } from "./routers/auth-router";
import { postRouter } from "./routers/post-router";
import { usersRouter } from "./routers/user-router";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */

const api = j
  .router()
  .basePath("/api")
  /* .use(j.defaults.cors) */
  .use(
    cors({
      origin: (origin) => origin,
      // origin: "http://localhost:3000", // !! add your frontend URL here
      allowHeaders: ["x-is-superjson", "Content-Type", "Authorization"],
      exposeHeaders: ["x-is-superjson", "Content-Length"],
      allowMethods: ["GET", "POST", "OPTIONS" /* , "DELETE", "PUT" */],
      credentials: true,
      maxAge: 600,
    }),
  )
  .onError(j.defaults.errorHandler);

const appRouter = j.mergeRouters(api, {
  post: postRouter,
  auth: authRouter,
  users: usersRouter,
});

console.log("======================================================");

export type AppRouter = typeof appRouter;

/* import type { InferRouterInputs, InferRouterOutputs } from "jstack"
type InferInput = InferRouterInputs<AppRouter>
type InferOutput = InferRouterOutputs<AppRouter>
// 👇 Usage: InferInput[<router>][<procedure>]
type Input = InferInput["post"]["example"]
type Output = InferOutput["post"]["example"] */

export default appRouter;
