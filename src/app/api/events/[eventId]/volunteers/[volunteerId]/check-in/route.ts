import { deleteEventVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';
import { mongo } from 'mongoose';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

// @route DELETE /api/events/[eventId]/volunteers/[volunteerId]/check-in - Delete an EventVolunteer
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventId: string; volunteerId: string } }
) {
  try {
    // Check Volunteer ID
    const validationVolunteer = zObjectId.safeParse(params.volunteerId);
    if (!validationVolunteer.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    // Check Event ID
    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return new CMError(CMErrorType.BadValue, 'Event Id').toNextResponse();
    }

    // Delete EventVolunteer using Volunteer ID and Event ID
    const res = await deleteEventVolunteer(params.volunteerId, params.eventId);
    if (!res) {
      return new CMError(CMErrorType.NoSuchKey, 'EventVolunteer').toNextResponse();
    }
    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return new CMError(CMErrorType.DuplicateKey, 'EventVolunteer').toNextResponse();
    }
    return CMErrorResponse(error);
  }
}