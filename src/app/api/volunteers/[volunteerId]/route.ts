import { updateVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';

// @route PUT /api/volunteers/[volunteerId] - updates an existing volunteer in the database
export async function PUT(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  console.log('in put func\n');

  const validationResult = zObjectId.safeParse(params.volunteerId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer ID' },
      { status: 400 }
    );
  }

  // Get the updated volunteer data
  const requestBody = await _request.json();

  const updatedVolunteer = await updateVolunteer(
    params.volunteerId,
    requestBody
  );
  if (!updatedVolunteer) {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 404 }
    );
  }
  return new NextResponse(undefined, { status: 204 });
}
