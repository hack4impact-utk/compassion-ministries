import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';

export async function createOrganization(): Promise<string> {
//name: string,
//softDelete: boolean
  try {
    await dbConnect();
    const organization = await OrganizationSchema.create({
      //name: name,
      //softDelete: softDelete,
    });
    return organization._id.toString(); // Return the _id as a string
  } catch (error) {
    throw new Error('Failed to create organization');
  }
}
