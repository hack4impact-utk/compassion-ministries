import { getServerSession } from 'next-auth';
import CMError, { CMErrorType } from './cmerror';

export async function userAuth() {
  const session = await getServerSession();
  if (!session) {
    throw new CMError(CMErrorType.Unauthorized);
  }
  return session;
}
