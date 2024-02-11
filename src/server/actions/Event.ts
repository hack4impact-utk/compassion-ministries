import { CreateEventRequest } from '@/types/dataModel/event';
import Event from '../models/Event';
import { createRecurringEvent } from './RecurringEvent';

export async function createEvent(
  createEventReq: CreateEventRequest
): Promise<string> {
  try {
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
