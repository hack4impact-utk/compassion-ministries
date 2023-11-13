import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

/**
 * Soft delete a volunteer
 * @param volunteerId The Id of the volunteer to be deleted
 * @returns The volunteer in the database before soft-deletion, or null
 */
export async function softDeleteVolunteer(
  volunteerId: string
): Promise<VolunteerEntity | null> {
  await dbConnect();

  const res: VolunteerEntity | null = await VolunteerSchema.findByIdAndUpdate(
    volunteerId,
    { softDelete: true }
  );

  return res;
}
