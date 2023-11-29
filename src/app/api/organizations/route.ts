import {
  createOrganization,
  getAllOrganizations,
} from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateOrganizationRequest } from '@/types/dataModel/organization';
import { mongo } from 'mongoose';

//import mongoose from 'mongoose';

// @route GET /api/organizations - Get all organizations
export async function GET() {
  try {
    const organizations = await getAllOrganizations();

    return NextResponse.json(organizations, { status: 200 });
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

// @route Post /api/organizations/ - Creates an organization

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const validationResult = zCreateOrganizationRequest.safeParse(req);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Name' },
        { status: 400 }
      );
    }
    const res = await createOrganization(validationResult.data);

    return NextResponse.json({ id: res }, { status: 201 });
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
