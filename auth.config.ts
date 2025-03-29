import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    authorized({ request, auth }) {
      const protectedRoutes = [
        /\/shipping-adress/,
        /\/payment-method/,
        /\/confirmation/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
      ];

      const { pathname } = request.nextUrl;

      // check if user is authnticated

      if (!auth && protectedRoutes.some((path) => path.test(pathname))) {
        return false;
      }

      if (!request.cookies.get("sessionCartId")) {
        // Generate new session cart id cookie

        const sessionCartId = crypto.randomUUID();

        // clone the request Header
        const RequestHeaders = new Headers(request.headers);

        // response with header

        const response = NextResponse.next({
          request: {
            headers: RequestHeaders,
          },
        });
        // set the sessionCartId cookie
        response.cookies.set("sessionCartId", sessionCartId);

        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
