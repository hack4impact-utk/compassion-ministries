import { deleteVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';
import { mongo } from 'mongoose';

// @route DELETE /api/organizations/[organizationId] - Soft deletes an organization
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventId: string; volunteerId: string } }
) {
  try {
    const validationVolunteer = zObjectId.safeParse(params.volunteerId);
    if (!validationVolunteer.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Id' },
        { status: 400 }
      );
    }

    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Id' },
        { status: 400 }
      );
    }

    const res = await deleteVolunteer(params.volunteerId, params.eventId);
    if (!res) {
      return NextResponse.json(
        { message: 'Organization not found' },
        { status: 404 }
      );
    }
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return NextResponse.json({ message: error }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
