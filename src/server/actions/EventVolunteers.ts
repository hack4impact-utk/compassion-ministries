import EventVolunteerSchema from '@/server/models/EventVolunteer';
import EventSchema from '@/server/models/Event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Role } from '@/types/dataModel/roles';
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect';
EventVolunteerSchema;
EventSchema;

export async function getEventVolunteersByRole(
  role: Role
): Promise<EventVolunteerResponse[]> {
  let evs: EventVolunteerResponse[];
  try {
    await dbConnect();
    evs = await EventVolunteerSchema.find({ role }).populate('event').lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return evs;
}

export async function getEventVolunteersByOrganization(
  organizationId: string
): Promise<EventVolunteerResponse[]> {
  let evs: EventVolunteerResponse[];
  try {
    await dbConnect();
    evs = await EventVolunteerSchema.find({
      organization: organizationId,
    })
      .populate('volunteer')
      .populate('event');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return evs;
}
