import { softDeleteVolunteer } from '@/server/actions/Volunteers';
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
