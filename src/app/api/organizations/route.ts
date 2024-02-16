import {
  createOrganization,
  getAllOrganizations,
} from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateOrganizationRequest } from '@/types/dataModel/organization';
import { mongo } from 'mongoose';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

//import mongoose from 'mongoose';

// @route GET /api/organizations - Get all organizations
export async function GET() {
  try {
    const organizations = await getAllOrganizations();

    return NextResponse.json(organizations, { status: 200 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return new CMError(CMErrorType.DuplicateKey, "Organization").toNextResponse();
    }
    return CMErrorResponse(error);
  }
}

// @route Post /api/organizations/ - Creates an organization
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateOrganizationRequest.safeParse(req);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Organization name').toNextResponse();
    }
    const res = await createOrganization(validationResult.data);

    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return new CMError(CMErrorType.DuplicateKey, "Organization").toNextResponse();
    }
    return CMErrorResponse(error);
  }
}
