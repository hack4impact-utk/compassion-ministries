import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { Organization } from '@/types/dataModel/organization';

export async function createOrganization(
  name: string
): Promise<Organization | null> {
  await dbConnect();

  const res: Organization | null = await OrganizationSchema.create({
    name: name,
  });

  return res;
}
