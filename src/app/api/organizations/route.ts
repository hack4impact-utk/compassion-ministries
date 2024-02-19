import {
  createOrganization,
  getAllOrganizations,
} from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateOrganizationRequest } from '@/types/dataModel/organization';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

// @route GET /api/organizations - Get all organizations
export async function GET() {
  try {
    const organizations = await getAllOrganizations();

    return NextResponse.json(organizations, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

// @route Post /api/organizations/ - Creates an organization
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateOrganizationRequest.safeParse(req);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'Organization'
      ).toNextResponse();
    }
    const res = await createOrganization(validationResult.data);

    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
