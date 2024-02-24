import { CreateEventRequest } from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';
import {
  CreateEventVolunteerRequest,
  EventVolunteerResponse,
} from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { EventResponse } from '@/types/dataModel/event';
import EventSchema from '@server/models/Event';

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

export async function getEventsBetweenDates(startDate: Date, endDate: Date):
Promise<EventResponse[]> {
  await dbConnect();
  
  const events = await EventSchema.find( { startDate})
  // find all events from the EventSchema where startDate <= Event.date <= EndDate
}
