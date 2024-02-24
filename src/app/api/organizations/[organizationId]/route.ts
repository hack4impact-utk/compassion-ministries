import {
  softDeleteOrganization,
  updateOrganization,
} from '@/server/actions/Organization';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateOrganizationRequest } from '@/types/dataModel/organization';
import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

// @route DELETE /api/organizations/[organizationId] - Soft deletes an organization
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.organizationId);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'Organization Id'
      ).toNextResponse();
    }

    await softDeleteOrganization(params.organizationId);
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

// @route PUT /api/organizations/[organizationId] - updates an existing organization in the database
export async function PUT(
  request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.organizationId);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'Organization Id'
      ).toNextResponse();
    }

    // Get the updated organization data
    const requestBody = await request.json();

    const validationRequest = zUpdateOrganizationRequest.safeParse(requestBody);
    if (!validationRequest.success) {
      return new CMError(CMErrorType.BadValue, 'Organization').toNextResponse();
    }

    await updateOrganization(params.organizationId, validationRequest.data);

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
