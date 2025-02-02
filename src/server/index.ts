// import { cors } from "hono/cors";
import { j } from "./jstack";
import { authRouter } from "./routers/auth-router";
import { postRouter } from "./routers/post-router";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  //.use(corsMiddleware);
  .onError(j.defaults.errorHandler);

/*
  const corsMiddleware = j.fromHono(
    cors({
      origin: "http://localhost:3001", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );
*/

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */

const appRouter = j.mergeRouters(api, {
  post: postRouter,
  auth: authRouter,
});

console.log(
  "--------------------------------------------------------------------------------------------------"
);

export type AppRouter = typeof appRouter;

export default appRouter;
