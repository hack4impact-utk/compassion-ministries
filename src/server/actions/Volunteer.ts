import {
  VolunteerResponse,
  CreateVolunteerRequest,
  UpdateVolunteerRequest,
} from '@/types/dataModel/volunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

// Temporary code to load org schema until we are using it elsewhere
import OrganizationSchema from '@/server/models/Organization';
import { RoleVerificationRequest } from '@/types/dataModel/roles';
OrganizationSchema;

/**
 * Deletes a volunteer's role object
 * @param volunteerId requires the id of the volunteer
 * @returns the volunteer in the DB or null for error
 */

export async function deleteVolunteerRole(
  volunteerId: string,
  role: string
): Promise<VolunteerEntity | null> {
  try {
    await dbConnect();
    const volunteer: VolunteerEntity | null =
      await VolunteerSchema.findByIdAndUpdate(
        volunteerId,
        { $pull: { roleVerifications: { role: role } } },
        { new: true }
      );

    return volunteer;
  } catch (error) {
    throw error;
  }
}

/**
 * Gets all volunteers.
 * @returns Collection of VolunteerEntities in the database, or null if there are none.
 */
export async function getAllVolunteers(): Promise<VolunteerResponse[] | null> {
  try {
    await dbConnect();
    const volunteers: VolunteerResponse[] =
      await VolunteerSchema.find().populate('previousOrganization');
    return volunteers;
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a volunteer
 * @param request The CreateVolunteerRequest containing data for the new volunteer
 * @returns The id of the new volunteer
 */
export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();
    const volunteer = await VolunteerSchema.create(request);
    return volunteer._id.toString();
  } catch (error) {
    throw error;
  }
}

/**
 * Takes in a volunteer id and updates the corresponding volunteer with the new data
 * @param volunteerId  The id of the existing volunteer
 * @param updatedVolunteer The updated volunteer
 */
export async function updateVolunteer(
  volunteerId: string,
  updatedVolunteer: UpdateVolunteerRequest
): Promise<void> {
  try {
    await dbConnect();

    const res = await VolunteerSchema.findByIdAndUpdate(
      volunteerId,
      updatedVolunteer
    );
    if (!res) {
      throw new Error('Volunteer not found'); // TODO: update error handling
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Delete an EventVolunteer
 * @param volunteerId The id of the existing volunteer
 * @param eventId The id of the existing event
 * @returns The object needs to be deleted
 */
export async function deleteEventVolunteer(
  volunteerId: string,
  eventId: string
): Promise<EventVolunteerEntity | null> {
  try {
    await dbConnect();
    const res: EventVolunteerEntity | null =
      await EventVolunteerSchema.findOneAndDelete({
        volunteer: volunteerId,
        event: eventId,
      });
    return res;
  } catch (error) {
    throw error;
  }
}

/**
 * Create or update a volunteer's role verification for a specific role
 * @param volunteerId The ID of the volunteer to verify
 * @param roleVerificationRequest The role verification request
 * @returns The updated volunteer
 */
export async function upsertVolunteerRoleVerification(
  volunteerId: string,
  roleVerificationRequest: RoleVerificationRequest
) {
  try {
    // TODO: we could save a database call by structuring role verifications like
    // { 'Medical': { verifier: '...', lastUpdated: '...' }, 'Dental': { verifier: '...', lastUpdated: '...' } }
    await dbConnect();

    const currentVerifications = await VolunteerSchema.findById(volunteerId)
      .select('roleVerifications')
      .exec();

    // update the role verification if it exists
    let roleVerificationExists = false;
    currentVerifications?.roleVerifications?.forEach((roleVerification) => {
      if (roleVerification.role === roleVerificationRequest.role) {
        roleVerification.verifier = roleVerificationRequest.verifier;
        roleVerification.lastUpdated = new Date();
        roleVerificationExists = true;
      }
    });

    // add the role verification if it doesn't exist
    if (!roleVerificationExists) {
      currentVerifications?.roleVerifications?.push({
        verifier: roleVerificationRequest.verifier,
        lastUpdated: new Date(),
        role: roleVerificationRequest.role,
      });
    }

    // update the volunteer with the new role verifications
    const res = await VolunteerSchema.findByIdAndUpdate(volunteerId, {
      roleVerifications: currentVerifications?.roleVerifications,
    });

    if (!res) {
      throw new Error('Volunteer not found');
    }
  } catch (error) {
    throw error;
  }
}
