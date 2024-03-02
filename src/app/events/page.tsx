import { getEventsBetweenDates } from '@/server/actions/Event';
import EventsView from '@/views/EventsView';
import dayjs from 'dayjs';

export default async function EventsPage() {
  const startOfMonth = dayjs().startOf('month').toDate();
  const events = await getEventsBetweenDates(startOfMonth, new Date());
  if (!events) {
    return <div>Failed to load events</div>;
  }

  return <EventsView events={events} />;
}
