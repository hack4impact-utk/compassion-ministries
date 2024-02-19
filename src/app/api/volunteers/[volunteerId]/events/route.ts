import { getAllEventsForVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
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
  try {
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    // calls the server function to get all events for volunteer
    const res = await getAllEventsForVolunteer(params.volunteerId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
