import { checkInVolunteer } from '@/server/actions/Event';
import { createVolunteer, updateVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import {
  CreateEventVolunteerRequest,
  zCreateEventVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import { UpdateVolunteerRequest } from '@/types/dataModel/volunteer';
import { mongo } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// @route POST /api/events/[eventId]/check-in - Create an EventVolunteer
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
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

    const evReq = validationResult.data;

    // if volunteer is an object, we need to create a new volunteer
    if (typeof evReq.volunteer === 'object') {
      const newVolunteerId = await createVolunteer(evReq.volunteer);
      evReq.volunteer = newVolunteerId;
    }

    const res = await checkInVolunteer(validationResult.data);

    if (res) {
      const updateRequest: UpdateVolunteerRequest = {
        previousRole: validationResult.data.role,
        previousOrganization: validationResult.data.organization,
      };

      await updateVolunteer(evReq.volunteer, updateRequest);
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
