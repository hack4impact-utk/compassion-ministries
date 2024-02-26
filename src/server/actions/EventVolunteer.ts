import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import EventVolunteerShema from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';

/**
 * Get all volunteers for a specific event
 * @param eventId // Id of the event
 * @returns // All volunteers for the event
 */
export async function getEventVolunteersByOrganization(
  organizationId: string
): Promise<EventVolunteerResponse[]> {
  try {
    await dbConnect();
    const events: EventVolunteerResponse[] = await EventVolunteerShema.find({
      organization: organizationId,
    });

    return events;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
