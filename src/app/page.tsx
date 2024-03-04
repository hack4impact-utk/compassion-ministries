import { getEventVolunteersByOrganization } from '@/server/actions/Volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';

export default async function Home() {
  const eventVolunteers: VolunteerEventResponse[] =
    await getEventVolunteersByOrganization('65e56830863313c2b700715b');

  // return event name
  return (
    <div>
      <h1> Volunteer Page </h1>
      {eventVolunteers.map((eventVolunteer: VolunteerEventResponse) => (
        <div key={eventVolunteer._id}>{eventVolunteer.event.name}</div>
      ))}
    </div>
  );
}
