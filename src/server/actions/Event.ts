import { CreateEventRequest } from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';

export async function createEvent(
  createEventReq: CreateEventRequest
): Promise<string> {
  try {
    await dbConnect();
    // first create the event
    const res = await Event.create(createEventReq);
    if (!res) {
      throw new Error('Event not created');
    }

    // create recurring event if it is a recurring event
    if (createEventReq.isRecurring) {
      await createRecurringEvent({
        event: res._id.toString(),
        recurrence: createEventReq.recurrence,
      });
    }

    return res._id.toString();
  } catch (e) {
    throw e;
  }
}

export async function checkInVolunteer(
  createEventVolunteerRequest: CreateEventVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();

    const res = await EventVolunteer.create(createEventVolunteerRequest);

    // TODO for #58 handle a duplicate entry fail case here (duplicate event+volunteer ID combination)
    if (!res) {
      throw new Error('Event not created');
    }

    return res._id.toString();
  } catch (e) {
    throw e;
  }
}

export async function getAllVolunteersForEvent(
  eventId: string
): Promise<VolunteerResponse[]> {
  let vols: VolunteerResponse[];
  try {
    await dbConnect();
    vols = await EventVolunteerSchema.find({ event: eventId }).populate(
      'volunteer'
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return vols;
}
