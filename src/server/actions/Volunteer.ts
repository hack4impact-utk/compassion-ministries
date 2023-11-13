import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import dbConnect from '@/utils/db-connect';

/**
 * Gets all volunteers.
 * @returns Collection of VolunteerEntities in the database, or null if there are none.
 */
export async function getAllVolunteers(): Promise<VolunteerResponse[] | null> {
  try {
    await dbConnect();
    require('../models/Organization'); // surely there's a way to accomplish this on app startup? this feels like a bad practice
    const volunteers: VolunteerResponse[] =
      await VolunteerSchema.find().populate('previousOrganization');

    return volunteers;
  } catch (error) {
    throw error;
  }
}
