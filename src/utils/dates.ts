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

export function timeStrToDate(time: string, date: Date = new Date()) {
  const dateCpy = new Date(date);
  const [hours, minutes] = time.split(':').map(Number);
  dateCpy.setHours(hours);
  dateCpy.setMinutes(minutes);
  return dateCpy;
}

export function dateToTimeStr(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
