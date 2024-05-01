import { checkInVolunteer } from '@/server/actions/Event';
import { createVolunteer, updateVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import {
  CreateEventVolunteerRequest,
  zCreateEventVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import { UpdateVolunteerRequest } from '@/types/dataModel/volunteer';
import { userAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

// @route POST /api/events/[eventId]/check-in - Create an EventVolunteer and create a new volunteer if needed
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    await userAuth();

    // Check Event ID
    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return new CMError(CMErrorType.BadValue, 'Event Id').toNextResponse();
    }

    // create full request body (vol and event id come through in query params)
    const req: CreateEventVolunteerRequest = {
      ...(await request.json()),
      event: params.eventId,
    };

    // validate the request body
    const validationResult = zCreateEventVolunteerRequest.safeParse(req);

    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer'
      ).toNextResponse();
    }

    const evReq = validationResult.data;

    // if isEdited is false and we have an object, first create the volunteer
    if (!evReq.isEdited && typeof evReq.volunteer === 'object') {
      const newVolunteerId = await createVolunteer(evReq.volunteer);
      evReq.volunteer = newVolunteerId;
    }

    const res = await checkInVolunteer(evReq);

    if (res) {
      const updateRequest: UpdateVolunteerRequest = {
        previousRole: evReq.role,
        previousOrganization: evReq.organization,
        ...(evReq.isEdited ? evReq.updatedVolunteer : {}),
      };

      await updateVolunteer(evReq.volunteer as string, updateRequest);
    }

    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
