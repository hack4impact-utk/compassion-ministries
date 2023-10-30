import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { Organization } from '@/types/dataModel/organization';

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
