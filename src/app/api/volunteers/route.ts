import { getAllVolunteers } from '@/server/actions/Volunteer';
import { NextResponse } from 'next/server';

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
