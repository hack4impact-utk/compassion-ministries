import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { BackgroundCheckWebhookPayload } from '@/types/dataModel/BackgroundCheckWebhookPayload';
import VolunteerSchema from '@/server/models/Volunteer';
/**
 * Get a specific volunteer and update background check
 * @param payload // BackgroundCheckWebhookPayload
 * @returns // volunteerschema or null
 */
export async function handleBackgroundCheckWebhook(
  payload: BackgroundCheckWebhookPayload
): Promise<void> {
  let res;
  try {
    await dbConnect();
    res = await VolunteerSchema.findOneAndUpdate(
      { email: payload?.data.employee_email },
      {
        $set: {
          'backgroundCheck.status': payload.data.overall_status,
          'backgroundCheck.lastUpdated': new Date(),
        },
      },
      { new: true }
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'BackgroundCheckWebhook');
  }
}
