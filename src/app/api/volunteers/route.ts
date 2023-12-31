import { getAllVolunteers, createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateVolunteerRequest } from '@/types/dataModel/volunteer';

// @route GET /api/volunteers - Get all volunteers
export async function GET() {
  try {
    const volunteers = await getAllVolunteers();
    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// @route POST /api/volunteers - Creates a volunteer
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateVolunteerRequest.safeParse(req);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Request Body' },
        { status: 400 }
      );
    }

    const res = await createVolunteer(validationResult.data);
    return NextResponse.json({ _id: res }, { status: 201 });
  } catch (error) {
    if ((error = 11000)) {
      return NextResponse.json(
        { message: 'Conflict: Duplicate Entry' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
