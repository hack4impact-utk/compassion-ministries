import {
  VolunteerResponse,
  CreateVolunteerRequest,
} from '@/types/dataModel/volunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';

// Temporary code to load org schema until we are using it elsewhere
import OrganizationSchema from '@/server/models/Organization';
OrganizationSchema;

/**
 * Gets all volunteers.
 * @returns Collection of VolunteerEntities in the database, or null if there are none.
 */
export async function getAllVolunteers(): Promise<VolunteerResponse[] | null> {
  try {
    await dbConnect();
    const volunteers: VolunteerResponse[] =
      await VolunteerSchema.find().populate('previousOrganization');
    return volunteers;
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a volunteer
 * @param request The CreateVolunteerRequest containing data for the new volunteer
 * @returns The id of the new volunteer
 */
export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();
    const volunteer = await VolunteerSchema.create(request);
    return volunteer._id.toString();
  } catch (error) {
    throw error;
  }
}

export async function deleteVolunteer(
  volunteerId: string,
  eventId: string
): Promise<EventVolunteerEntity | null> {
  try {
    await dbConnect();
    const res: EventVolunteerEntity | null =
      await EventVolunteerSchema.findOneAndDelete({
        volunteer: volunteerId,
        event: eventId,
      });
    return res;
  } catch (error) {
    throw error;
  }
}
