import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import EditCheckInView from '@/views/EditCheckinView';
import getVo

export default async function EditCheckInPage({
  params,
}: {
  params: { eventVol: string };
}) {
  // find the event volunteer with that id
  const volunteer: EventVolunteerResponse = await getEventVolunteer(
    return <EditCheckInView eventId={params.eventVol} />;
}
