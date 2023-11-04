import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { Organization } from '@/types/dataModel/organization';
import { CreateOrganizationRequest } from '@/types/dataModel/organization';
import { OrganizationEntity } from '@/types/dataModel/organization';
/**
 * Create an organization
 * @param CreateOrganizationRequest requires the name of the organization
 * @returns _id The Id of the organization
 */

export async function createOrganization(
  request: CreateOrganizationRequest
): Promise<string> {
  try {
    const connection = await dbConnect();
    const organization = await OrganizationSchema.create(request);

    connection.connection.on('error', (err) => {
      throw new Error(err.code);
    });

    return organization._id.toString();
  } catch (error) {
    throw error;
  }
}



/**
 * Soft delete an organization
 * @param organizationId The Id of the organization to be deleted
 * @returns The organization in the database before soft-deletion, or null
 */
export async function softDeleteOrganization(
  organizationId: string
): Promise<OrganizationEntity | null> {
  await dbConnect();

  const res: OrganizationEntity | null =
    await OrganizationSchema.findByIdAndUpdate(organizationId, {
      softDelete: true,
    });

  return res;
}
