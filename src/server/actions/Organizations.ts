import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { CreateOrganizationRequest } from '@/types/dataModel/organization';

/**
 * Create an organization
 * @param CreateOrganizationRequest requires the name of the organization
 * @returns _id The Id of the organization
 */

export async function createOrganization(
  request: CreateOrganizationRequest
): Promise<string> {
  try {
    await dbConnect();
    const organization = await OrganizationSchema.create(request);
    return organization._id.toString();
  } catch (error) {
    throw new Error('Failed to create organization');
  }
}
