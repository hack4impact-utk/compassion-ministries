import { createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';

// @route POST /api/volunteers - Creates a volunteer
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const res = await createVolunteer(req);
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
