import { getAllVolunteers } from '@/server/actions/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteersView from '@/views/volunteers/VolunteersView';

export default async function VolunteerPage() {
  let volunteers: VolunteerResponse[];
  try {
    volunteers = JSON.parse(JSON.stringify(await getAllVolunteers()));
  } catch (e) {
    return <h1>ERROR: Volunteers not found</h1>;
  }

  return (
    <>
      <VolunteersView volunteers={volunteers} />
    </>
  );
}
