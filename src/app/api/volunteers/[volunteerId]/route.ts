import { updateVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import {
  zCreateVolunteerRequest,
  zVolunteerResponse,
} from '@/types/dataModel/volunteer';
import { NextRequest, NextResponse } from 'next/server';

// @route PUT /api/volunteers/[volunteerId] - updates an existing volunteer in the database
export async function PUT(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  const validationResult = zObjectId.safeParse(params.volunteerId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer ID' },
      { status: 400 }
    );
  }

  const vId = validationResult.data;

  // Get the updated volunteer data
  const res = await request.json();
  const volunteerRequest = zCreateVolunteerRequest.safeParse(res);

  let updatedVolunteer;
  if (volunteerRequest.success) {
    updatedVolunteer = await updateVolunteer(vId, volunteerRequest.data);
  } else {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 404 }
    );
  }

  const responseValidation = zVolunteerResponse.safeParse(updatedVolunteer);
  if (responseValidation.success) {
    return new NextResponse(undefined, { status: 204 });
  } else {
    return new NextResponse(undefined, { status: 400 });
  }
}
