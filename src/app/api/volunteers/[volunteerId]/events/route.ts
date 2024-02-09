import { getAllEventsForVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Gets all events a volunteer has attended
 * @param _request
 * @returns all the events the volunteer attended
 */
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

  // calls the server function to get all events for volunteer
  const res = await getAllEventsForVolunteer(params.volunteerId);
  if (!res) {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 404 }
    );
  }

  // if no error: return all the events
  return NextResponse.json(res, { status: 200 });
}
