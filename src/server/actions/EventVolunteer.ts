import EventVolunteerShema from '../models/EventVolunteer';
import EventVolunteerReponse from '../models/EventVolunteer';
import dbConnect from '../utils/db-connect';

export async function getEventVolunteersByOrganization(
  organizationId: string
): Promise<EventVolunteerReponse[]> {
  await dbConnect();
  // call the EventVolunteerSchema.find and search by the organization field on EventVoluneer. Return this list
  const events = await EventVolunteerShema.find({
    organization: organizationId,
  });
  return events;
}
