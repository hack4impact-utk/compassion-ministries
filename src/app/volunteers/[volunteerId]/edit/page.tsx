import EditVolunteerView from '@/views/volunteers/EditVolunteerView';
import { getVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import CMError, { CMErrorType } from '@/utils/cmerror';
//import { VolunteerResponse } from '@/types/dataModel/volunteer';

export default async function VolunteerPage({
  params,
}: {
  params: { volunteerId: string };
}) {
  const validationResult = zObjectId.safeParse(params.volunteerId);
  if (!validationResult.success) {
    return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
  }
  const res = JSON.parse(
    JSON.stringify(await getVolunteer(params.volunteerId))
  );

  if (!res) {
    return <div>Volunteer not found</div>;
  }
  return <EditVolunteerView volunteer={res}></EditVolunteerView>;
}
