import { CreateEventRequest, EventResponse } from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/Event';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { datesBetweenFromRrule } from '@/utils/dates';
import RecurringEventSchema from '@/server/models/RecurringEvent';
import { ContentPasteGoOutlined } from '@mui/icons-material';
import { RecurringEventResponse } from '@/types/dataModel/recurringEvent';

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

export async function getEventsBetweenDates(
  startDate: Date,
  endDate: Date
): Promise<EventResponse[] | null> {
  await dbConnect();

  // look for events that are between the start and and date
  const events = await EventSchema.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const recurringEvents = await RecurringEventSchema.find().populate('event') as RecurringEventResponse;
  //console.log(recurringEvents);
  // console.log(events);

  for (const recurringEvent of recurringEvents) {
    const dates = datesBetweenFromRrule(
      recurringEvent.recurrence,
      startDate,
      endDate
    );
    for (const date of dates) {
      if (date >= startDate && date <= endDate) {
        const event: EventResponse = {
          ...recurringEvent.event, 
          _id: recurringEvent.event.id,
          isRecurring: true,
          recurrence: recurringEvent.recurrence,
          recurringEventId: recurringEvent.id,
        };
      }
    }
  }

  //console.log(events);
  // create a EventResponse based for every
  return null;
}

export async function getEvent(eventId: string): Promise<EventResponse> {
  let doc;

  // Get event from schema
  try {
    doc = await EventSchema.findById(eventId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  // No event has been located within the database.
  if (!doc) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }

  // this should never happen
  if (doc.isRecurring) {
    throw new CMError(CMErrorType.InternalError);
  }

  // cast all this stuff to the same stuff
  const event: EventResponse = {
    ...doc,
    _id: doc.id,
    isRecurring: false,
  };
  return event;
}
