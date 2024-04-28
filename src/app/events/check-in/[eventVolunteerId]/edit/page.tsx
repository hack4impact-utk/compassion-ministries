import EditCheckInView from '@/views/EditCheckinView';
import { getEventVolunteer } from '@/server/actions/EventVolunteers';
import { EventResponse } from '@/types/dataModel/event';
import { getEvent } from '@/server/actions/Event';
import { getAllOrganizations } from '@/server/actions/Organization';

export default async function EditCheckInPage({
  params,
}: {
  params: { eventVolunteerId: string };
}) {
  const eventVolunteer = await getEventVolunteer(params.eventVolunteerId);
  const event: EventResponse = await getEvent(eventVolunteer.event);
  const organizations = await getAllOrganizations();
  return (
    <EditCheckInView
      eventVolunteer={eventVolunteer}
      event={event}
      organizations={organizations}
    />
  );
}
