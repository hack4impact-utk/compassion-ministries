import { updateEventVolunteer } from '@/server/actions/EventVolunteers';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { userAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { eventVolunteerId: string } }
) {
  try {
    await userAuth();

    const idValidationResult = zObjectId.safeParse(params.eventVolunteerId);
    if (!idValidationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer Id'
      ).toNextResponse();
    }

    const data = await req.json();
    const validationResult = zUpdateEventVolunteerRequest.safeParse(data);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer'
      ).toNextResponse();
    }

    const evReq = validationResult.data;

    await updateEventVolunteer(params.eventVolunteerId, evReq);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
