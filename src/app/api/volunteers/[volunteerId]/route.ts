import { updateVolunteer } from '@/server/actions/Volunteer';
import { softDeleteVolunteer, getVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

// @route DELETE /api/volunteers/[volunteerId] - Soft deletes a volunteer
export async function DELETE(
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
  const res = await softDeleteVolunteer(params.volunteerId);
  if (!res || res.softDelete) {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 404 }
    );
  }
  return new NextResponse(undefined, { status: 204 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  // validate volunteer id
  const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
  if (!objectIdValidationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer Id' },
      { status: 400 }
    );
  }

  // validate request body is a valid updateVolunteerRequest
  const body = await request.json();
  const updateVolunteerRequestValidationResult =
    zUpdateVolunteerRequest.safeParse(body);
  if (!updateVolunteerRequestValidationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Request Body' },
      { status: 400 }
    );
  }

  // update the volunteer
  try {
    await updateVolunteer(
      params.volunteerId,
      updateVolunteerRequestValidationResult.data
    );
  } catch (error) {
    // TODO: update error handling
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }

  return new NextResponse(undefined, { status: 204 });
}

// @route GET /api/volunteers/[volunteerId] - get a specific volunteer
export async function GET(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }
    const res = await getVolunteer(params.volunteerId);
    return NextResponse.json(res, { status: 200 });

  } catch(error) {
    if (error instanceof CMError) {
      return error.toNextResponse();
    } else {
      return new CMError(CMErrorType.UnknownError, "API").toNextResponse();
    }
  }
}
