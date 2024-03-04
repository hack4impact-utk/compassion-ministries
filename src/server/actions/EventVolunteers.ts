import EventVolunteerSchema from '@/server/models/EventVolunteer';
import EventSchema from '@/server/models/Event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Role } from '@/types/dataModel/roles';
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect';
EventVolunteerSchema;
EventSchema;

export async function getEventVolunteersByEventRole(
  role: Role
): Promise<EventVolunteerResponse[]> {
  let evs: EventVolunteerResponse[];
  try {
    await dbConnect();
    evs = await EventVolunteerSchema.find().populate({
      path: 'event', // Path to the field that holds the reference to Event
      match: { eventRoles: role }, // Condition to match the documents in the Event collection
    });
  } catch (error) {
    console.log(error);
    throw new CMError(CMErrorType.InternalError);
  }
  return evs;
}
