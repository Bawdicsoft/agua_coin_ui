import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("Middleware check: token =", token);
  console.log("Middleware check: role =", role);
  console.log("Pathname =", url.pathname);

  // ✅ Restrict admin-only access
  if (url.pathname.startsWith("/dashboard/admin")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ✅ Restrict user-only access
  if (url.pathname.startsWith("/dashboard/user")) {
    if (!token || role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin/:path*", "/dashboard/user/:path*"],
};
