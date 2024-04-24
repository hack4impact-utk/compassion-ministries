import SettingsSchema from '@/server/models/Settings'
import UserSchema from '@/server/models/User'
import { SettingsResponse } from '@/types/dataModel/settings'
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect'
import { getUserByEmail } from './User';
import { UserResponse } from '@/types/dataModel/user';
import { getSettings } from './Settings';

export async function removeAllowedEmail(email: string) {
    let doc: SettingsResponse
    try {
        dbConnect();
        doc = await getSettings()
    } catch (error) {
        throw new CMError(CMErrorType.InternalError)
    }

    const index = doc.allowedEmails.indexOf(email)
    // No matching email found in email document
    if (index == -1) {
        throw new CMError(CMErrorType.NoSuchKey, "Email")
    } else {
        // Modifies array in-place
        doc.allowedEmails.splice(index, 1)
        // Set database obj array to modified array of retrieved document
        await SettingsSchema.updateOne({ _id: doc._id }, { allowedEmails: doc.allowedEmails })

        // Delete associated user if one exists
        try {
            const user: UserResponse = await getUserByEmail(email)
            await UserSchema.findOneAndRemove({ _id: user._id })
        } catch (e) { }

    }
}