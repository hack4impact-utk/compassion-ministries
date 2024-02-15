import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '@/server/models/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import OrganizationSchema from '@/server/models/Organization';
OrganizationSchema;
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';

/**
 * Soft delete a volunteer
 * @param volunteerId The Id of the volunteer to be deleted
 * @returns The volunteer in the database before soft-deletion, or null
 */
export async function softDeleteVolunteer(
  volunteerId: string
): Promise<VolunteerResponse | null> {
  let res: VolunteerResponse | null = null;
  try {
  await dbConnect();
  res = await VolunteerSchema.findByIdAndUpdate(
    volunteerId,
    { softDelete: true }
  );

  } catch (error) {
    throw new CMError(CMErrorType.InternalError, "Server");
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, "Volunteer");
  }
  return res; 
}

/**
 * Get a specific Volunteer
 * @param volunteerId // Id of the volunteer
 * @returns // Specific Volunteer, or null
 */
export async function getVolunteer(
  volunteerId: string
): Promise<VolunteerResponse | null> {
  let volunteer: VolunteerResponse | null = null;
  try {
    await dbConnect();
    volunteer = await VolunteerSchema.findById(volunteerId)
     .populate('previousOrganization');
  } catch (error) {
      throw new CMError(CMErrorType.InternalError, "Server");
    }
  if (!volunteer) {
    throw new CMError(CMErrorType.NoSuchKey, "Volunteer");
  }
  return volunteer;
}
/** 
 * Get all events that a volunteer has attended
 * @param volunteerId // Id of the volunteer
 * @returns // Collection of EventVolunteerEntities, or null
 */
export async function getAllEventsForVolunteer(
  volunteerId: string
): Promise<EventVolunteerResponse[]| null> {
  let events: EventVolunteerResponse[] | null = null;
  try {
    await dbConnect();
    events = await EventVolunteerSchema.find({volunteerId})
     .populate('volunteer').populate('organization');
    // TODO: populate events

  } catch (error) {
    throw new CMError(CMErrorType.InternalError, "Server");
  }
  if (!events) {
    throw new CMError(CMErrorType.NoSuchKey, "Events");
  }
  return events;
}
