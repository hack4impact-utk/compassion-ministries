import { getEvent } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import EditEventView from '@/views/EditEventView';

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventResponse = await getEvent(params.eventId);
  return <EditEventView event={event} />;
}
