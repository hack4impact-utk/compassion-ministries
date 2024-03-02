import {
  getAllEventsForVolunteer,
  getVolunteer,
} from '@/server/actions/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerView from '@/views/volunteers/VolunteerView';
import EventSchema from '@/server/models/Event';
EventSchema;

export default async function VolunteerPage({
  params,
}: {
  params: { volunteerId: string };
}) {
  let volunteer: VolunteerResponse;
  try {
    volunteer = JSON.parse(
      JSON.stringify(await getVolunteer(params.volunteerId))
    );
  } catch (e) {
    return <h1>Volunteer not found</h1>;
  }
  const volunteeredEvents = JSON.parse(
    JSON.stringify(await getAllEventsForVolunteer(params.volunteerId))
  );
  return <VolunteerView volunteer={volunteer} events={volunteeredEvents} />;
}
