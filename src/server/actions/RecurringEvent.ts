import { CreateRecurringEventRequest } from '@/types/dataModel/recurringEvent';
import RecurringEvent from '../models/RecurringEvent';
import dbConnect from '@/utils/db-connect';

export async function createRecurringEvent(
  createRecurringEventReq: CreateRecurringEventRequest
): Promise<string> {
  try {
    await dbConnect();
    const res = await RecurringEvent.create(createRecurringEventReq);
    if (!res) {
      throw new Error('Recurring Event not created');
    }
    return res._id.toString();
  } catch (e) {
    throw e;
  }
}
