import { betterFetch } from "@better-fetch/fetch";
import { Session } from "./server/types/auth";
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/servers"];

export default async function authMiddleware(request: NextRequest) {
  /* const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const sessionToken = request.cookies.get("better-auth.session_token");
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } */

  const nextUrl = request.nextUrl;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  const sessionCookie = getSessionCookie(request);

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/servers", request.url));
  }

  if (!sessionCookie && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// more middleware logic for authorization
