import { getEvent } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventResponse = await getEvent(params.eventId);
  event;
  return <></>;
}
