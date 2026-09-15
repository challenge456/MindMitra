import { NextResponse } from "next/server";

export function proxy(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    url.pathname = "/demo";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
