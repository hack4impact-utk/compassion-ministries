import { getServerSession } from 'next-auth';
import CMError, { CMErrorType } from './cmerror';
import { handler } from '@/app/api/auth/[...nextauth]/auth';

export async function userAuth() {
  const session = await getServerSession(handler);
  if (!session) {
    throw new CMError(CMErrorType.Unauthorized);
  }
  return session;
}
