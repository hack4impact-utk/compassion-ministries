import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

export async function updateVolunteer(
  volunteerId: string,
  updatedData: object
): Promise<VolunteerEntity | null> {
  await dbConnect();

  // Find the volunteer by its ID and update it with the new data
  const updatedVolunteer: VolunteerEntity | null =
    await VolunteerSchema.findByIdAndUpdate(volunteerId, {
      $set: updatedData,
      updatedAt: new Date().toJSON(),
    });

  return updatedVolunteer;
}
