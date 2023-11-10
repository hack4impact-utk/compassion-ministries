import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '../models/Volunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
/**
 * Deletes a volunteer
 * @param volunteerId requires the id of the volunteer
 * @returns the volunteer in the DB or null
 */

export async function deleteVolunteer(
  _id: string
): Promise<VolunteerEntity | null> {
  try {
    await dbConnect();
    const volunteer: VolunteerEntity | null =
      await VolunteerSchema.findByIdAndUpdate(
        _id,
        { $unset: { roleVerifications: 1 } },
        { new: true }
      );

    return volunteer;
  } catch (error) {
    throw error;
  }
}
