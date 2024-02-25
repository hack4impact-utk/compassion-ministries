import { CreateEventRequest, EventResponse } from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';
import {
  CreateEventVolunteerRequest,
  EventVolunteerResponse,
} from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/Event';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
VolunteerSchema;
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

export async function getEvent(eventId: string): Promise<EventResponse> {
  let doc;

  // Get event from schema
  try {
    doc = await EventSchema.findById(eventId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  // yo where's my event??
  if (!doc) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }

  // this should never happen
  if (doc.isRecurring) {
    throw new CMError(CMErrorType.InternalError);
  }

  // cast all this shit to the same exact shit
  const event: EventResponse = {
    name: doc.name,
    description: doc.description,
    eventLocation: doc.eventLocation,
    startAt: doc.startAt,
    endAt: doc.endAt,
    date: doc.date,
    eventRoles: doc.eventRoles,
    emailBodies: doc.emailBodies,
    isRecurring: doc.isRecurring,
    parentEvent: doc.parentEvent,
    _id: doc.id,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
  return event;
}

export async function getAllVolunteersForEvent(
  eventId: string
): Promise<EventVolunteerResponse[]> {
  let eventVols: EventVolunteerResponse[];
  try {
    await dbConnect();
    eventVols = await EventVolunteerSchema.find({ event: eventId }).populate(
      'volunteer'
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return eventVols;
}
