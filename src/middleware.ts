export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/volunteers/:path*',
    '/events/:path*',
    '/organizations/:path*',
    '/settings/:path*',
  ],
};
