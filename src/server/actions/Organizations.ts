import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { Organization } from '@/types/dataModel/organization';
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


/**
 * Soft delete an organization
 * @param organizationId The Id of the organization to be deleted
 * @returns The organization in the database before soft-deletion, or null
 */
export async function softDeleteOrganization(
  organizationId: string
): Promise<Organization | null> {
  await dbConnect();

  // TODO update this to OrganizationEntity as a part of #20
  const res: Organization | null = await OrganizationSchema.findByIdAndUpdate(
    organizationId,
    {
      softDelete: true,
    }
  );

  return res;
}
