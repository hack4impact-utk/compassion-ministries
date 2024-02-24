import { getAllOrganizations } from '@/server/actions/Organization';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import EventSchema from '@/server/models/Event';
import { EventResponse } from '@/types/dataModel/event';
import CheckInView from '@/views/CheckInView';

export default async function CheckInPage({
  params,
}: {
  params: { eventId: string };
}) {
  // TODO: figure out a better way to ensure _id is always a string
  const volunteers = JSON.parse(JSON.stringify(await getAllVolunteers()));
  const organizations = JSON.parse(JSON.stringify(await getAllOrganizations()));
  const event = JSON.parse(
    JSON.stringify(await EventSchema.findById(params.eventId))
  ) as EventResponse;

  return (
    <CheckInView
      event={event}
      volunteers={volunteers}
      organizations={organizations}
    />
  );
}
