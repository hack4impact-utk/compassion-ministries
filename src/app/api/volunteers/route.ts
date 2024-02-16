import { getAllVolunteers, createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

// @route GET /api/volunteers - Get all volunteers
export async function GET() {
  try {
    const volunteers = await getAllVolunteers();
    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

// @route POST /api/volunteers - Creates a volunteer
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateVolunteerRequest.safeParse(req);
    if (!validationResult.success) {
      // this was originally a bad body error using 400 so I might make new one
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    const res = await createVolunteer(validationResult.data);
    return NextResponse.json({ _id: res }, { status: 201 });
  } catch (error) {
    if ((error = 11000)) {
      return new CMError(CMErrorType.DuplicateKey, 'Volunteer').toNextResponse();
    }
    return CMErrorResponse(error);
  }
}
