import { VolunteerEntity } from '@/types/dataModel/volunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import dbConnect from '@/utils/db-connect';

/**
 * Gets all volunteers.
 * @returns Collection of VolunteerEntities in the database, or null if there are none.
 */
export async function getAllVolunteers(): Promise<VolunteerEntity[] | null> {
  try {
    await dbConnect();
    const volunteers: VolunteerEntity[] | null = await VolunteerSchema.find();
    return volunteers;
  } catch (error) {
    throw error;
  }
}
