import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerResponse,
         VolunteerEntity,
         RoleVerificationRequest 
} from '@/types/dataModel/volunteer';

/**
 * Get a specific Volunteer
 * @param volunteerId // Id of the volunteer
 * @returns // Specific Volunteer, or null
 */

export async function getVolunteer(
  volunteerId: string
): Promise<VolunteerResponse | null> {
  try {
    await dbConnect();

    // find the volunteer by id
    const volunteer: VolunteerResponse | null = await 
    VolunteerSchema.findById(volunteerId).populate('previousOrganization')

    return volunteer;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}

export async function verifyRole(
  volunteerId: string,
  updatedData: RoleVerificationRequest
) {
  try {
    await dbConnect(); 

    const volunteer: VolunteerResponse | null = 
      await VolunteerSchema.findById(volunteerId).exec(); 

    const verifications = volunteer?.roleVerifications; 

    if (verifications) {

    }

  } catch (error) {
    throw error; 
  }
}