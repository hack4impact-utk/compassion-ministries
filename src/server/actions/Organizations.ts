import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import {
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from '@/types/dataModel/organization';
import { OrganizationEntity } from '@/types/dataModel/organization';
import CMError, { CMErrorType } from '@/utils/cmerror';
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
    throw new CMError(CMErrorType.InternalError, 'Server');
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
  let res: OrganizationEntity | null = null;
  try {
    await dbConnect();
    res = await OrganizationSchema.findByIdAndUpdate(organizationId, {
      softDelete: true,
    });

  } catch (error) {
    throw new CMError(CMErrorType.InternalError, 'Server');
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Organization');
  }
  return res;
}

/**
 * update existing organization information
 * @param organizationId The Id of the organization to be updated
 * @param updatedData The data to be updated in database
 * @returns The organization in the database before soft-deletion, or null
 */
export async function updateOrganization(
  organizationId: string,
  updatedData: UpdateOrganizationRequest
): Promise<UpdateOrganizationRequest | null> {
  let updatedOrganization: UpdateOrganizationRequest | null = null;
  try {
    const connection = await dbConnect();
    connection.connection.on('error', (err) => {
      throw new Error(err.code);
    });

    // Find the organization by its ID and update it with the new data
    updatedOrganization = await OrganizationSchema
    .findByIdAndUpdate(organizationId, updatedData);;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError, 'Server');
  }
  if (!updatedOrganization) {
    throw new CMError(CMErrorType.NoSuchKey, 'Organization');
  }
  return updatedOrganization;
}

/**
 * returns ALL organizations in the database
 * @param organizations all organization in the database
 * @returns all organization in the database
 */
export async function getAllOrganizations(): Promise<
  OrganizationEntity[] | null
> {
  try {
    const connection = await dbConnect();
    connection.connection.on('error', (err) => {
      throw new Error(err.code);
    });

    const organizations: OrganizationEntity[] | null =
      await OrganizationSchema.find();

    return organizations;
  } catch (error) {
    // const errorMessage = 'Internal Server Error';
    // throw { status: 500, message: errorMessage };
    throw error;
  }
}
