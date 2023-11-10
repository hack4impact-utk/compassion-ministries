import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

/**
 * Get a specific Volunteer
 * @param volunteerId // Id of the volunteer
 * @returns // Specific Volunteer, or null
 */

export async function getVolunteer(
  VolunteerId: string
): Promise<VolunteerEntity | null> {
  try {
    // error check
    const connection = await dbConnect();
    connection.connection.on('error', (err) => {
      throw new Error(err.code);
    });

    // actually find the volunteer by id
    const Volunteer: VolunteerEntity | null = await VolunteerSchema.findById(
      VolunteerId,
      {}
    );

    return Volunteer;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}
