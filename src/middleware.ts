import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "./lib/auth-client";
import { getSessionCookie } from "better-auth/cookies";

export default async function authMiddleware(request: NextRequest) {
  /* const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } */


  /* const sessionToken = request.cookies.get("better-auth.session_token");
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } */

    
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

  return NextResponse.next();
}

export const config = {
  matcher: [],
};

// more middleware logic for authorization
