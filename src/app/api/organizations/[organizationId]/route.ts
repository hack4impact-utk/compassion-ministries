import {
  softDeleteOrganization,
  updateOrganization,
} from '@/server/actions/Organizations';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateOrganizationRequest } from '@/types/dataModel/organization';
import { NextRequest, NextResponse } from 'next/server';
import { mongo } from 'mongoose';

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
  request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.organizationId);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Id' },
        { status: 400 }
      );
    }

    // Get the updated organization data

    const requestBody = await request.json();

    const validationRequest = zUpdateOrganizationRequest.safeParse(requestBody);
    if (!validationRequest.success) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    const updatedOrganization = await updateOrganization(
      params.organizationId,
      validationRequest.data
    );

    if (!updatedOrganization) {
      return NextResponse.json(
        { message: 'Organization not found' },
        { status: 404 }
      );
    }

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return NextResponse.json({ message: error }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error ' },
      { status: 500 }
    );
  }
}
