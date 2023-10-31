import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import { CreateOrganizationRequest } from '@/types/dataModel/organization';

export async function createOrganization(
  request: CreateOrganizationRequest
): Promise<string> {
  //name: string,
  //softDelete: boolean
  try {
    await dbConnect();
    const organization = await OrganizationSchema.create(
      request
      //name: name,
      //softDelete: softDelete,
    );
    return organization._id.toString(); // Return the _id as a string
  } catch (error) {
    throw new Error('Failed to create organization');
  }
}
