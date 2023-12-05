import { softDeleteVolunteer, getVolunteer } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
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

// @route GET /api/volunteers/[volunteerId] - get a specific volunteer
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

  const res = await getVolunteer(params.volunteerId);
  if (!res) {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 404 }
    );
  }

  // if no error: return the specific Volunteer found
  return NextResponse.json(res, { status: 200 });
}