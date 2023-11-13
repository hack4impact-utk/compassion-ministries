import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { CreateVolunteerRequest } from '@/types/dataModel/volunteer';

/**
 * Creates a volunteer
 * @param request The CreateVolunteerRequest containing data for the new volunteer
 * @returns The id of the new volunteer
 */
export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();
    const volunteer = await VolunteerSchema.create(request);
    return volunteer._id.toString();
  } catch (error) {
    throw error;
  }
}
