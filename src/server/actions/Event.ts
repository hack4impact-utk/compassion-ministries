import {
  CreateEmailRequest,
  CreateEventRequest,
  EventResponse,
} from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';
import {
  CreateEventVolunteerRequest,
  EventVolunteerResponse,
} from '@/types/dataModel/eventVolunteer';
import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/Event';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { datesBetweenFromRrule } from '@/utils/dates';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import RecurringEventSchema from '@/server/models/RecurringEvent';
import { RecurringEventResponse } from '@/types/dataModel/recurringEvent';
import { upsertVolunteerRoleVerification } from './Volunteer';
import { VerifiedRole } from '@/types/dataModel/roles';
import { mongo } from 'mongoose';
import nodemailer from 'nodemailer';

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

    // if there is a verifier, we need to create a role verification
    if (createEventVolunteerRequest.verifier) {
      await upsertVolunteerRoleVerification(
        createEventVolunteerRequest.volunteer as string,
        {
          role: createEventVolunteerRequest.role as VerifiedRole,
          verifier: createEventVolunteerRequest.verifier,
        }
      );

      // remove the verifier from the request
      delete createEventVolunteerRequest.verifier;
    }

    const res = await EventVolunteerSchema.create(createEventVolunteerRequest);

    // TODO for #58 handle a duplicate entry fail case here (duplicate event+volunteer ID combination)
    if (!res) {
      throw new Error('Event not created');
    }

    return res._id.toString();
  } catch (error) {
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'EventVolunteer');
      }
    }
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getEventsBetweenDates(
  startDate: Date,
  endDate: Date
): Promise<EventResponse[] | null> {
  await dbConnect();

  // TODO: cover edge case when a new event instance is created when a volunteer is checked in

  // look for events that are between the start and and date
  const events: EventResponse[] = await EventSchema.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    softDelete: { $ne: true },
  }).lean();

  const recurringEvents = (await RecurringEventSchema.find({
    softDelete: false,
  }).populate('event')) as RecurringEventResponse[];

  for (const recurringEvent of recurringEvents) {
    const dates = datesBetweenFromRrule(
      recurringEvent.recurrence,
      startDate,
      endDate
    );

    for (const date of dates) {
      if (date >= startDate && date <= endDate) {
        const event: EventResponse = {
          name: recurringEvent.event.name,
          description: recurringEvent.event.description,
          eventLocation: recurringEvent.event.eventLocation,
          startAt: recurringEvent.event.startAt,
          endAt: recurringEvent.event.endAt,
          date,
          eventRoles: recurringEvent.event.eventRoles,
          emails: recurringEvent.event.emails,
          isRecurring: true,
          parentEvent: recurringEvent.event.parentEvent,
          recurrence: recurringEvent.recurrence,
          recurringEventId: recurringEvent._id.toString(),
          _id: recurringEvent.event._id.toString(),
          createdAt: recurringEvent.event.createdAt,
          updatedAt: recurringEvent.event.updatedAt,
        };
        events.push(event);
      }
    }
  }

  //console.log(events);
  return events;
}

export async function getEvent(eventId: string): Promise<EventResponse> {
  let doc;

  // Get event from schema
  try {
    await dbConnect();
    doc = await EventSchema.findById(eventId).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  // No event has been located within the database.
  if (!doc) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }

  // this should never happen
  if (doc.isRecurring) {
    throw new CMError(
      CMErrorType.InternalError,
      'Attempted to retrieve recurring event',
      true
    );
  }

  // cast all this stuff to the same stuff
  const event: EventResponse = {
    name: doc.name,
    description: doc.description,
    eventLocation: doc.eventLocation,
    startAt: doc.startAt,
    endAt: doc.endAt,
    date: doc.date,
    eventRoles: doc.eventRoles,
    emails: doc.emails,
    parentEvent: doc.parentEvent,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    _id: doc._id.toString(),
    isRecurring: false,
  };
  return event;
}

export async function getAllVolunteersForEvent(
  eventId: string
): Promise<EventVolunteerResponse[]> {
  let eventVols: EventVolunteerResponse[];
  try {
    await dbConnect();
    eventVols = await EventVolunteerSchema.find({ event: eventId })
      .populate('volunteer')
      .populate('organization')
      .lean();

    // convert ObjectId's to strings
    eventVols.forEach((ev) => {
      ev.volunteer.previousOrganization =
        ev.volunteer.previousOrganization?.toString();
      ev.event = ev.event.toString();
      ev.organization = ev.organization;
    });
  } catch (error) {
    console.error(error);
    throw new CMError(CMErrorType.InternalError);
  }
  return eventVols;
}

// Sends an email to all volunteers have been checked in for this event
export async function sendEventEmail(
  eventId: string,
  createEmailRequest: CreateEmailRequest
): Promise<string[]> {
  try {
    const evs: EventVolunteerResponse[] =
      await getAllVolunteersForEvent(eventId);
    const emails: string[] = evs.map((ev) => {
      return ev.volunteer.email;
    });

    // Note: Verification w/ app password requires a 2FA'd Google Account
    // The compassion ministries events email acct currently has 2FA tied to 
    // Ethan Maness's phone number -- 423-276-1498
    // Text me or email me at ethanhmaness@gmail.com if there are issues.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EVENTS_EMAIL_ADDR,
        pass: process.env.EVENTS_EMAIL_APP_PASS,
      }
    });

    const emailOptions = {
      from: process.env.EVENTS_EMAIL_ADDR,
      to: emails.join(','),
      subject: createEmailRequest.subject,
      html: createEmailRequest.emailbody,
    };

    await transporter.sendMail(emailOptions);

    return emails;

  } catch (error) {
    console.log(error);
    throw new CMError(CMErrorType.InternalError);
  }
}
