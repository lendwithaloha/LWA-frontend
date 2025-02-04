import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/solutions",
  "/about",
  "/contact",
];

const isStaticAsset = (pathname: string) => {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|json|map)$/.test(
    pathname
  );
};

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Allow public routes and static assets to bypass the middleware
  if (PUBLIC_ROUTES.includes(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/accessToken=([^;]+)/);
  const accessToken = tokenMatch?.[1];

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const tokenParts = accessToken.split(".");
  if (tokenParts.length !== 3) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = JSON.parse(
      atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    // if (payload.exp && payload.exp * 1000 < Date.now()) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  } catch (error) {
    console.error("Token parsing error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
