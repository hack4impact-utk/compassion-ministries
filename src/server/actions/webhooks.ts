import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { BackgroundCheckWebhookPayload } from '@/types/dataModel/backgroundCheckWebhookPayload';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
/**
 * Get a specific volunteer and update background check
 * @param payload // BackgroundCheckWebhookPayload
 * @returns // volunteer or null
 */
export async function handleBackgroundCheckWebhook(
  payload: BackgroundCheckWebhookPayload
): Promise<VolunteerResponse> {
  let res: VolunteerResponse | null = null;

  try {
    await dbConnect();
    res = await VolunteerSchema.findOneAndUpdate(
      {
        email: payload?.data.employee_email,
        backgroundCheck: { $exists: true },
      },
      {
        $set: {
          'backgroundCheck.status':
            payload.data.overall_status.charAt(0).toUpperCase() +
            payload.data.overall_status.slice(1).toLowerCase(),
        },
      }
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'BackgroundCheckWebhook');
  }
  return res;
}
