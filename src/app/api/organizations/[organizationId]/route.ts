import {
  softDeleteOrganization,
  updateOrganization,
} from '@/server/actions/Organizations';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';

// @route DELETE /api/organizations/[organizationId] - Soft deletes an organization
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const validationResult = zObjectId.safeParse(params.organizationId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Organization Id' },
      { status: 400 }
    );
  }

  const res = await softDeleteOrganization(params.organizationId);
  if (!res || res.softDelete) {
    return NextResponse.json(
      { message: 'Organization not found' },
      { status: 404 }
    );
  }
  return new NextResponse(undefined, { status: 204 });
}

// @route PUT /api/organizations/[organizationId] - updates an existing organization in the database
export async function PUT(
  _request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.organizationId);
    if (!validationResult.success) {
      throw new Error('Invalid Organization Id');
    }

    // Get the updated organization data
    const requestBody = await _request.json();

    const updatedOrganization = await updateOrganization(
      params.organizationId,
      requestBody
    );

    if (!updatedOrganization) {
      throw new Error('Organization not found');
    }

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    let status = 500; // Default to Internal Server Error status
    let message = 'Internal Server Error';

    if ((e as Error).message === 'Invalid Organization Id') {
      status = 400;
      message = 'Invalid Organization Id';
    } else if ((e as Error).message === 'Organization not found') {
      status = 404;
      message = 'Organization not found';
    }

    return new NextResponse(message as BodyInit, { status });
  }
}
