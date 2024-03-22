import { getAllOrganizations } from '@/server/actions/Organization';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import { getEvent } from '@/server/actions/Event';
import CheckInView from '@/views/CheckInView';

export default async function CheckInPage({
  params,
}: {
  params: { eventId: string };
}) {
  // TODO: figure out a better way to ensure _id is always a string
  const volunteers = JSON.parse(JSON.stringify(await getAllVolunteers()));
  const event = await getEvent(params.eventId);
  // tsx-ignore
  const organizations = await getAllOrganizations();

  return (
    <CheckInView
      event={event}
      volunteers={volunteers}
      organizations={organizations}
    />
  );
}
