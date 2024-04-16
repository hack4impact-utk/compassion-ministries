import { EventResponse } from '@/types/dataModel/event';
import { rrulestr } from 'rrule';

export function getMinMaxTimestampsFromYear(year: number) {
  const minDate = new Date(year, 0, 1);
  minDate.setUTCHours(0, 0, 0, 0);

  const maxDate = new Date(year, 11, 31);
  maxDate.setUTCHours(23, 59, 59, 999);

  return [minDate, maxDate];
}

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
