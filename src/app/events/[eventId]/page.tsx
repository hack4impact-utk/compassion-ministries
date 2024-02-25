import { getAllVolunteersForEvent, getEvent } from '@/server/actions/Event';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import EventView from '@/views/EventView';

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event: EventResponse = JSON.parse(
    JSON.stringify(await getEvent(params.eventId))
  );
  const vols: EventVolunteerResponse[] = JSON.parse(
    JSON.stringify(await getAllVolunteersForEvent(params.eventId))
  );
  return <EventView event={event} eventVolunteers={vols} />;
}
