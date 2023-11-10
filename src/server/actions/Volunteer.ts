import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
/**
 * Deletes a volunteer
 * @param volunteerId requires the id of the volunteer
 * @returns the volunteer in the DB or null
 */

export async function deleteVolunteer(
  volunteerId: string
): Promise<VolunteerEntity | null> {
  try {
    await dbConnect();
    const volunteer: VolunteerEntity | null =
      await OrganizationSchema.findByIdAndDelete(volunteerId);

    return volunteer;
  } catch (error) {
    throw error;
  }
}
