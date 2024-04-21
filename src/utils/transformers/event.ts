import { CreateEventRequest } from '@/types/dataModel/event';
import { EventFormData } from '@/types/forms/events';
import { timeStrToDate } from '../dates';

export function createEventTransformer(
  formData: EventFormData
): CreateEventRequest {
  const date = formData.date.toDate();
  const startAtDate = timeStrToDate(formData.startAt, date);
  const endAtDate = timeStrToDate(formData.endAt, date);

  return {
    name: formData.name,
    description: formData.description,
    eventLocation: formData.eventLocation,
    startAt: startAtDate,
    endAt: endAtDate,
    date,
    eventRoles: formData.eventRoles,
    isRecurring: false,
  };
}
