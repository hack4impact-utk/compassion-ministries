import { EventResponse } from '@/types/dataModel/event';
import { rrulestr } from 'rrule';

export function datesBetweenFromRrule(
  rrule: string,
  startDate: Date,
  endDate: Date
): Date[] {
  const rrule1 = rrulestr(rrule);
  return rrule1.between(startDate, endDate);
}

export function getEventDisplayDate(event: EventResponse) {
  return `${event.date?.toDateString()}, ${event.startAt.toLocaleTimeString(
    [],
    {
      hour: 'numeric',
      minute: '2-digit',
    }
  )} - ${event.endAt.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}
