import { authMiddleware } from "@clerk/nextjs";

// const protectedRoutes = ['/', '/upcoming', '/previous', '/recordings', '/personal-room', '/meeting(.*)'];

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhook/clerk',
    // '/api/webhook/stripe',
    // '/api/uploadthing'
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    // '/api/webhook/stripe',
    // '/api/uploadthing'
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"
  ]
};