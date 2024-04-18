import { authMiddleware } from "@clerk/nextjs";

// const protectedRoutes = ['/', '/upcoming', '/previous', '/recordings', '/personal-room', '/meeting(.*)'];

export default authMiddleware({
  publicRoutes: [
    '/api/webhook/clerk',
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"
  ]
};