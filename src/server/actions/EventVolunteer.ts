import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import EventVolunteerShema from '../models/EventVolunteer';

/**
 * Get all volunteers for a specific organization
 * @param organizationId // Id of the organization
 * @returns // All volunteers for the organization */
export async function getVolunteersByOrganization(
  organizationId: string
): Promise<VolunteerEntity[]> {
  // Investigate if mongoose will only return unique volunteers
  try {
    await dbConnect();
    const volunteers: VolunteerEntity[] = await EventVolunteerShema.find({
      organization: organizationId,
    }).distinct('volunteer');

    // map the result into an array of VolunteerEntity
    const volunteerEntities: VolunteerEntity[] = volunteers.map(
      (volunteer) => { volunteer: volunteerEntity.volunteer }
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
