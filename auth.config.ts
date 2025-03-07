import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
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
