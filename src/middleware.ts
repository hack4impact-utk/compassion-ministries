export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/page', '/layout', '/volunteers'],
};
