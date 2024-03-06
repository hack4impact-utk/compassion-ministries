import { getEventsBetweenDates } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import EventsView from '@/views/EventsView';
import dayjs from 'dayjs';

const sortEventsByDateDesc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
};

export default async function EventsPage() {
  const startOfMonth = dayjs().startOf('month').toDate();
  const endOfMonth = dayjs().endOf('month').toDate();
  const events = await getEventsBetweenDates(startOfMonth, endOfMonth);
  let sortedEvents: EventResponse[];
  if (!events) {
    return <div>Failed to load events</div>;
  } else {
    sortedEvents = sortEventsByDateDesc(events);
  }

  return <EventsView events={sortedEvents} />;
}
