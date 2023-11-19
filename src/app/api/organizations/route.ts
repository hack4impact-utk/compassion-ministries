import { NextResponse } from 'next/server';
import { getAllOrganizations } from '@/server/actions/Organizations';
import { mongo } from 'mongoose';

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
