import EventVolunteerSchema from '@/server/models/EventVolunteer';
import {
  EventVolunteerResponse,
  UpdateEventVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import { Role } from '@/types/dataModel/roles';
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect';
import VolunteerSchema from '../models/Volunteer';
EventVolunteerSchema;

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

export async function updateEventVolunteer(
  id: string,
  evReq: UpdateEventVolunteerRequest
) {
  try {
    await dbConnect();
    const ev = await EventVolunteerSchema.findByIdAndUpdate(id, evReq, {
      new: true,
    });

    // update previous fields
    const updateVol = {
      previousRole: ev?.role,
      previousOrganization: ev?.organization,
    };

    await VolunteerSchema.findByIdAndUpdate(ev?.volunteer, updateVol);
  } catch (e) {
    throw new CMError(CMErrorType.InternalError);
  }
}
