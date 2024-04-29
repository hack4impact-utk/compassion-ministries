import SettingsSchema from '@/server/models/Settings'
import UserSchema from '@/server/models/User'
import { SettingsResponse } from '@/types/dataModel/settings'
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect'
import { getSettings } from './Settings';
import { adminAuth } from '@/utils/auth';

export async function removeAllowedEmail(email: string) {
    let doc: SettingsResponse
    try {
        await adminAuth();
        await dbConnect();

        doc = await getSettings()
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
                await UserSchema.findOneAndRemove({ email: email })
            } catch (e) { }
        }

    } catch (error) {
        throw error instanceof CMError ? error : new CMError(CMErrorType.InternalError)
    }
}