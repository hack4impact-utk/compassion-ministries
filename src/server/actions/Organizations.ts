import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';

export async function createOrganization() {
//name: string,
//softDelete: boolean,
  await dbConnect();

  const organization = await OrganizationSchema.create({
    //name: name,
    //softDelete: softDelete,
  });

  return organization;
}
