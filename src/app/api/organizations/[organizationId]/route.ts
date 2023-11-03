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
  const validationResult = zObjectId.safeParse(params.organizationId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Organization Id' },
      { status: 400 }
    );
  }

  // get the updated organization data
  const requestBody = await _request.json();

  const updatedOrganization = await updateOrganization(
    params.organizationId,
    requestBody
  );
  if (!updatedOrganization) {
    return NextResponse.json(
      { message: 'Organization not found' },
      { status: 404 }
    );
  }
  return new NextResponse(undefined, { status: 204 });
}
