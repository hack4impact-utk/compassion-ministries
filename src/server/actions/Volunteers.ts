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
  await dbConnect();

  const res: VolunteerResponse | null = await VolunteerSchema.findByIdAndUpdate(
    volunteerId,
    { softDelete: true }
  );

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
  try {
    await dbConnect();
    const volunteer: VolunteerResponse | null = await 
     VolunteerSchema.findById(volunteerId).populate('previousOrganization');
    if (!volunteer) {
      throw "Volunteer not found";
    }
    return volunteer;

  } catch (error) {
    if (error === "Volunteer not found") {
      throw new CMError(CMErrorType.NoSuchKey, "Volunteer not found");
    } else {
      throw new CMError(CMErrorType.InternalError, "Internal Server Error");
    }
  }
}

export async function getAllEventsForVolunteer(
  volunteerId: string
): Promise<EventVolunteerResponse[]| null> {
  try {
    await dbConnect();
    
    const events: EventVolunteerResponse[] | null =
      await EventVolunteerSchema.find({volunteerId}).
      populate('volunteer').populate('organization');
    // TODO: populate evnts

    return events;
  } catch (error) {
    const errorMessage = 'Internal Server Error';
    throw { status: 500, message: errorMessage };
  }
}
