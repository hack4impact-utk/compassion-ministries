import { getAllOrganizations } from '@/server/actions/Organization';
import { getAllVolunteersForCheckIn } from '@/server/actions/Volunteer';
import { getEvent } from '@/server/actions/Event';
import CheckInView from '@/views/CheckInView';

export default async function CheckInPage({
  params,
}: {
  params: { eventId: string };
}) {
  const volunteers = await getAllVolunteersForCheckIn(params.eventId);
  const event = await getEvent(params.eventId);
  const organizations = await getAllOrganizations();

  return (
    <CheckInView
      event={event}
      volunteers={volunteers}
      organizations={organizations}
    />
  );
}
