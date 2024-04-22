import { getAllVolunteers, createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { userAuth } from '@/utils/auth';

// @route GET /api/volunteers - Get all volunteers
// TODO: remove
export async function GET() {
  try {
    await userAuth();

    const volunteers = await getAllVolunteers();
    return NextResponse.json(volunteers, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

// @route POST /api/volunteers - Creates a volunteer
export async function POST(request: NextRequest) {
  try {
    await userAuth();

    const req = await request.json();
    const validationResult = zCreateVolunteerRequest.safeParse(req);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    const res = await createVolunteer(validationResult.data);
    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
