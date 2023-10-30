import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '@/server/models/Organization';
import { OrganizationEntity } from '@/types/dataModel/organization';

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
