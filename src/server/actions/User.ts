import { UserResponse } from '@/types/dataModel/user';
import dbConnect from '@/utils/db-connect';
import UserSchema from '@/server/models/User';
import CMError, { CMErrorType } from '@/utils/cmerror';

export async function getUserByEmail(email: string): Promise<UserResponse> {
  let user: UserResponse | null = null;
  try {
    await dbConnect();
    user = await UserSchema.findOne({ email: email }).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!user) {
    throw new CMError(CMErrorType.NoSuchKey, 'User');
  }
  return user;
}

export async function getAllUsers(): Promise<UserResponse[]> {
  let users: UserResponse[] = [];
  try {
    await dbConnect();
    users = await UserSchema.find().lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return users;
}

export async function addAdmins(userIds: string[]): Promise<void> {
  try {
    await dbConnect();

    await UserSchema.updateMany({ _id: { $in: userIds } }, { isAdmin: true });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function removeAdmin(userId: string): Promise<void> {
  try {
    await dbConnect();

    await UserSchema.updateOne({ _id: userId }, { isAdmin: false });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
