import dbConnect from '@/utils/db-connect';
import OrganizationSchema from '../models/Organization';
import {
  CreateOrganizationRequest,
  OrganizationResponse,
  UpdateOrganizationRequest,
} from '@/types/dataModel/organization';
import { OrganizationEntity } from '@/types/dataModel/organization';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { mongo } from 'mongoose';

/**
 * Get a specific organization
 * @param organizationId // Id of the organization
 * @returns // Specific Organization, or null
 */
export async function getOrganization(
  organizationId: string
): Promise<OrganizationResponse> {
  let organization: OrganizationResponse | null = null;
  try {
    await dbConnect();
    organization = await OrganizationSchema.findById(organizationId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!organization) {
    throw new CMError(CMErrorType.NoSuchKey, 'Organization');
  }
  return organization;
}

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
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Organization name');
      }
    }
    throw new CMError(CMErrorType.InternalError);
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
    throw new CMError(CMErrorType.InternalError);
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
    await dbConnect();

    // Find the organization by its ID and update it with the new data
    updatedOrganization = await OrganizationSchema.findByIdAndUpdate(
      organizationId,
      updatedData
    );
  } catch (error) {
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Organization name');
      }
    }
    throw new CMError(CMErrorType.InternalError);
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
export async function getAllOrganizations(): Promise<OrganizationResponse[]> {
  let organizations: OrganizationResponse[];
  try {
    await dbConnect();

    organizations = await OrganizationSchema.find();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return organizations;
}
