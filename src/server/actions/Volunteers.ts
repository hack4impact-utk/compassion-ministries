import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import {
  VolunteerEntity,
  VolunteerResponse,
} from '@/types/dataModel/volunteer';
import { OrganizationEntity } from '@/types/dataModel/organization';
import OrganizationSchema from '@/server/models/Organization';
OrganizationSchema;

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
    const volunteer: VolunteerResponse | null = await VolunteerSchema.findById(
      volunteerId
    ).populate('previousOrganization');

    return volunteer;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}

export async function getAllEventsForVolunteer(
  VolunteerId: string
): Promise<OrganizationEntity[] | null> {
  try {
    // error check
    await dbConnect();

    // actually look for all the events a volunteer with the given ID has attented
    const Volunteer: VolunteerEntity | null = await VolunteerSchema.findById(
      VolunteerId,
      {}
    );

    if (Volunteer === null) {
      const errorMessage = 'Volunteer not found';
      throw { status: 404, message: errorMessage };
    }

    // found the Volunteer, now need to tind all the events they attended
    //const organization : OrganizationEntity | null = await OrganizationSchema.findById(volunteerId)

    return null;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}
