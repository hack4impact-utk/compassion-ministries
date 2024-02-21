import { updateVolunteer } from '@/server/actions/Volunteer';
import { softDeleteVolunteer, getVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

// @route DELETE /api/volunteers/[volunteerId] - Soft deletes a volunteer
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }
    await softDeleteVolunteer(params.volunteerId);

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  // validate volunteer id
  try {
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
    if (!objectIdValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    // validate request body is a valid updateVolunteerRequest
    const body = await request.json();
    const updateVolunteerRequestValidationResult =
      zUpdateVolunteerRequest.safeParse(body);
    if (!updateVolunteerRequestValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    // update the volunteer
    await updateVolunteer(
      params.volunteerId,
      updateVolunteerRequestValidationResult.data
    );
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

// @route GET /api/volunteers/[volunteerId] - get a specific volunteer
export async function GET(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }
    const res = await getVolunteer(params.volunteerId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
