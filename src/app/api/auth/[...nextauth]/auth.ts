import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import dbConnect from '@/utils/db-connect';
import { getUserByEmail } from '@/server/actions/User';
import { getSettings } from '@/server/actions/Settings';

//NextAuth using Google Provider and JWT trategy
const clientPromise = dbConnect().then((mon) => {
  return mon.connection.getClient() as unknown as Promise<MongoClient>;
});

export const handler: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'defaultClientId',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'defaultClientSecret',
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: false,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.data && session.user) {
        session.user.isAdmin = (token.data as any).isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.email) {
        try {
          const user = await getUserByEmail(token.email);
          token.data = user;
        } catch {}
      }
      return token;
    },
    async signIn(verificationRequest) {
      const userEmail = verificationRequest.user.email!;

      // if the user has a compassion ministries domain, immediately allow their sign-in
      if (userEmail.endsWith('@compassionministries.net')) {
        return true;
      }

      // if the user is not on the allow-list in the settings collection
      const settings = await getSettings();
      return settings.allowedEmails.includes(userEmail);
    },
  },

  session: {
    strategy: 'jwt',
  },
};
