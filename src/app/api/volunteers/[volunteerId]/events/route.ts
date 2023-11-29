// GET function that given a volunteer ID, returns all events the volunteer has volunteered at

import { getAllEventsForVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  const validationResult = zObjectId.safeParse(params.volunteerId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer Id' },
      { status: 400 }
    );
  }

  const res = await getAllEventsForVolunteer(params.volunteerId);
  if (!res) {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 400 }
    );
  }

  return NextResponse.json(res, { status: 200 });
}
