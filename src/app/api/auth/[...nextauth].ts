import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/utils/db-connect';

const clientPromise = dbConnect().then((mon) => {
  return mon.connection.getClient() as unknown as Promise<MongoClient>;
});

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'defaultClientId',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'defaultClientSecret',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      // get allowed emails (for dev and troubleshooting)
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',');
      // Ensure that only users with the proper email domain or email may say in
      if (
        account?.provider === 'google' &&
        (profile?.email?.endsWith('@ccaht.org') ||
          allowedEmails?.includes(profile?.email || ''))
      ) {
        return profile?.email as string;
      } else {
        return false;
      }
    },
    // modifies the session returned to have the user's id. to find this, we use the token.sub which is the subject of the token.
    async session({ session, token }) {
      if (!token.sub || !session?.user) return session;
      session.user.email = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
