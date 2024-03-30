import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { BackgroundCheckWebhookPayload } from '@/types/dataModel/BackgroundCheckWebhookPayload';
import VolunteerSchema from '@/server/models/Volunteer';
/**
 * Get a specific volunteer and update background check
 * @param payload // BackgroundCheckWebhookPayload
 * @returns // payload or null
 */
export async function handleBackgroundCheckWebhook(): Promise<BackgroundCheckWebhookPayload> {
  let payload: BackgroundCheckWebhookPayload | null = null;
  try {
    await dbConnect();
    payload = await OrganizationSchema.findById(payload);

    await VolunteerSchema.findByIdAndUpdate(payload?.data.employee_email, {
      $pull: {
        roleVerifications: {
          verifier: payload?.data.employee_email,
          lastUpdated: new Date(),
        },
      },
    });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!payload) {
    throw new CMError(CMErrorType.NoSuchKey, 'BackgroundCheck');
  }
  return payload;
}
