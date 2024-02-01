import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/utils/db-connect';

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
    }),
  ],

  session: {
    strategy: 'jwt',
  },
};
