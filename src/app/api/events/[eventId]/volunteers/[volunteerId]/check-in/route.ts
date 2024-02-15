import {
  deleteEventVolunteer,
  updateVolunteer,
} from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';
import { mongo } from 'mongoose';
import {
  CreateEventVolunteerRequest,
  zCreateEventVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import { checkInVolunteer } from '@/server/actions/Event';
import { UpdateVolunteerRequest } from '@/types/dataModel/volunteer';

// @route POST /api/events/[eventId]/volunteers/[volunteerId]/check-in - Create an EventVolunteer
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string; volunteerId: string } }
) {
  try {
    // Check Volunteer ID
    const validationVolunteer = zObjectId.safeParse(params.volunteerId);
    if (!validationVolunteer.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    // Check Event ID
    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return NextResponse.json(
        { message: 'Invalid Event Id' },
        { status: 400 }
      );
    }

    // create full request body (vol and event id come through in query params)
    const req: CreateEventVolunteerRequest = {
      ...(await request.json()),
      volunteer: params.volunteerId,
      event: params.eventId,
    };

    // validate the request body
    const validationResult = zCreateEventVolunteerRequest.safeParse(req);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Request Body' },
        { status: 400 }
      );
    }

    const res = await checkInVolunteer(validationResult.data);

    if (res) {
      const updateRequest: UpdateVolunteerRequest = {
        previousRole: validationResult.data.role,
        previousOrganization: validationResult.data.organization,
      };

      await updateVolunteer(params.volunteerId, updateRequest);
    }

    return NextResponse.json({ id: res }, { status: 201 });
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

// @route DELETE /api/events/[eventId]/volunteers/[volunteerId]/check-in - Delete an EventVolunteer
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventId: string; volunteerId: string } }
) {
  try {
    // Check Volunteer ID
    const validationVolunteer = zObjectId.safeParse(params.volunteerId);
    if (!validationVolunteer.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    // Check Event ID
    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return NextResponse.json(
        { message: 'Invalid Event Id' },
        { status: 400 }
      );
    }

    // Delete EventVolunteer using Volunteer ID and Event ID
    const res = await deleteEventVolunteer(params.volunteerId, params.eventId);
    if (!res) {
      return NextResponse.json(
        { message: 'Object not found' },
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
