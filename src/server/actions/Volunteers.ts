import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import OrganizationSchema from '@/server/models/Organization';
OrganizationSchema;
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';

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
  volunteerId: string
): Promise<EventVolunteerResponse | null> {
  try {
    await dbConnect();

    const organization: EventVolunteerResponse | null =
      await OrganizationSchema.findById(volunteerId).populate(
        'event',
        'organization'
      );

    return organization;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}
