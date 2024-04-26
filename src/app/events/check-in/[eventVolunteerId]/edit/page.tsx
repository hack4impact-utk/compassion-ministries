import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
//import EditCheckInView from '@/views/EditCheckinView';
import { getEventVolunteer } from '@/server/actions/EventVolunteers';

export default async function EditCheckInPage({
  params,
}: {
  params: { eventVolunteerId: string };
}) {
  // find the event volunteer with that id
  let volunteer: EventVolunteerResponse | null = null;
  try {
    volunteer = await getEventVolunteer(params.eventVolunteerId);
    console.log(volunteer);
  } catch (e) {
    return <h1>Event Volunteer not found</h1>;
  }
  //return <EditCheckInView eventVolunteer={volunteer} />;
}
