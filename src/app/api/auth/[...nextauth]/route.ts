import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import NextAuth from 'next-auth/next';

// Export the nextauth handler as a Get and Post

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
