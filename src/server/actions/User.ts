import { UserResponse } from "@/types/dataModel/user";
import dbConnect from "@/utils/db-connect";
import UserSchema from '@/server/models/User'
import CMError, { CMErrorType } from "@/utils/cmerror";


export async function getUserByEmail(email: string): Promise<UserResponse> {
    let user: UserResponse | null = null;
    try {
        await dbConnect();
        user = await UserSchema.findOne({ email: email }).lean()
    } catch (error) {
        throw new CMError(CMErrorType.InternalError);
    }
    if (!user) {
        throw new CMError(CMErrorType.NoSuchKey, 'User');
    }
    return user;
}