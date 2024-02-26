import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import EventVolunteerShema from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';

/**
 * Get all volunteers for a specific organization
 * @param eventId // Id of the event
 * @returns // All volunteers for the organization
 */
export async function getEventVolunteersByOrganization(
  organizationId: string
): Promise<EventVolunteerResponse[]> {
  try {
    await dbConnect();
    const volunteers: EventVolunteerResponse[] = await EventVolunteerShema.find(
      {
        organization: organizationId
      }
    );
    // console.log(volunteers);

    return volunteers;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}