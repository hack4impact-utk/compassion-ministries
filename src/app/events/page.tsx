import { getEventsBetweenDates } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import { MIN_YEAR } from '@/utils/constants/year';
import EventsView from '@/views/EventsView';
import dayjs from 'dayjs';

const sortEventsByDateDesc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { year: string };
}) {
  const year = parseInt(searchParams.year || MIN_YEAR.toString());
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  const events = await getEventsBetweenDates(startOfYear, endOfYear);
  let sortedEvents: EventResponse[];
  if (!events) {
    return <div>Failed to load events</div>;
  } else {
    sortedEvents = sortEventsByDateDesc(events);
  }

  return <EventsView events={sortedEvents} />;
}
