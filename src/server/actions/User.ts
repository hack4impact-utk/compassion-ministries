import { UpdateAllowedUsersRequest, UserResponse } from '@/types/dataModel/user';
import dbConnect from '@/utils/db-connect';
import UserSchema from '@/server/models/User';
import CMError, { CMErrorType } from '@/utils/cmerror';
import Settings from '../models/Settings';
import { getSettings } from './Settings';

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

export async function updateAllowedUsers(req: UpdateAllowedUsersRequest) {
  try {
    await dbConnect();

    // if userEmails is defined, append new unique emails to array
    if (req.userEmails) {
      const currentSettings = await getSettings()
      // Concatenate values, then cast to set and back to remove duplicate entries
      const newAllowedEmails = [...new Set(currentSettings.allowedEmails.concat(req.userEmails))]
      // Replace old arr with new arr
      await Settings.updateOne({ _id: (await getSettings())._id }, { allowedEmails: newAllowedEmails })
    }
    // if adminIds is defined, flag users as admins
    if (req.adminIds) {
      await addAdmins(req.adminIds)
    }
  } catch (e) {
    throw new CMError(CMErrorType.InternalError)
  }
}