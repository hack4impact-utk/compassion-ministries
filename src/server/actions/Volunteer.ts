import {
  VolunteerResponse,
  CreateVolunteerRequest,
  UpdateVolunteerRequest,
} from '@/types/dataModel/volunteer';
import {
  EventVolunteerEntity,
  VolunteerEventResponse,
} from '@/types/dataModel/eventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { VerifiedRole } from '@/types/dataModel/roles';
// Temporary code to load org schema until we are using it elsewhere
import OrganizationSchema from '@/server/models/Organization';
import EventSchema from '@/server/models/Event';
import { RoleVerificationRequest } from '@/types/dataModel/roles';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { mongo } from 'mongoose';
OrganizationSchema;
EventSchema;

/**
 * Deletes a volunteer's roleverification object
 * @param volunteerId requires the id of the volunteer
 * @param role requires the id of the volunteer
 * @returns the volunteer in the DB or null for error
 */

export async function deleteVolunteerRoleVerification(
  volunteerId: string,
  role: VerifiedRole
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
export async function getAllVolunteers(): Promise<VolunteerResponse[]> {
  let volunteers: VolunteerResponse[];
  try {
    await dbConnect();
    volunteers = await VolunteerSchema.find().populate('previousOrganization');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return volunteers;
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
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Volunteer Phone/Email');
      }
    }
    throw new CMError(CMErrorType.InternalError);
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
  let res;
  try {
    await dbConnect();
    res = await VolunteerSchema.findByIdAndUpdate(
      volunteerId,
      updatedVolunteer
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
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
  let res: EventVolunteerEntity | null = null;
  try {
    await dbConnect();
    res = await EventVolunteerSchema.findOneAndDelete({
      volunteer: volunteerId,
      event: eventId,
    });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
  }
  return res;
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

    if (!currentVerifications) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }
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
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }
  } catch (error) {
    if (error instanceof CMError) {
      throw error;
    }
    throw new CMError(CMErrorType.InternalError);
  }
}

/**
 * Soft delete a volunteer
 * @param volunteerId The Id of the volunteer to be deleted
 * @returns The volunteer in the database before soft-deletion, or null
 */
export async function softDeleteVolunteer(
  volunteerId: string
): Promise<VolunteerResponse | null> {
  let res: VolunteerResponse | null = null;
  try {
    await dbConnect();
    res = await VolunteerSchema.findByIdAndUpdate(volunteerId, {
      softDelete: true,
    });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
  return res;
}

/**
 * Get a specific Volunteer
 * @param volunteerId // Id of the volunteer
 * @returns // Specific Volunteer, or null
 */
export async function getVolunteer(
  volunteerId: string
): Promise<VolunteerResponse> {
  let volunteer: VolunteerResponse | null = null;
  try {
    await dbConnect();
    volunteer = await VolunteerSchema.findById(volunteerId).populate(
      'previousOrganization'
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!volunteer) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
  return volunteer;
}
/**
 * Get all events that a volunteer has attended
 * @param volunteerId // Id of the volunteer
 * @returns // Collection of EventVolunteerEntities, or null
 */
export async function getAllEventsForVolunteer(
  volunteerId: string
): Promise<VolunteerEventResponse[]> {
  let events: VolunteerEventResponse[];
  try {
    await dbConnect();
    events = await EventVolunteerSchema.find({ volunteer: volunteerId })
      .populate('event')
      .populate('organization');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return events;
}

/**
 * Retrieves all volunteers associated with a specific organization.
 * @param organizationId The ID of the organization.
 * @returns Collection of VolunteerEventResponses for the organization, or null if there are none.
 */
export async function getEventVolunteersByOrganization(
  organizationId: string
): Promise<VolunteerEventResponse[]> {
  let volunteerEvent: VolunteerEventResponse[] = [];
  try {
    await dbConnect();
    volunteerEvent = await EventVolunteerSchema.find({
      organization: organizationId,
    }).populate('event');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return volunteerEvent;
}
