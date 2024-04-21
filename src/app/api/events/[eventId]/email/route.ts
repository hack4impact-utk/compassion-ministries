import { sendEventEmail } from '@/server/actions/Event';
import { zObjectId } from '@/types/dataModel/base';
import {
  CreateEmailRequest,
  zCreateEmailRequest,
} from '@/types/dataModel/event';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    // Check Event ID
    const validationEvent = zObjectId.safeParse(params.eventId);
    if (!validationEvent.success) {
      return new CMError(CMErrorType.BadValue, 'Event Id').toNextResponse();
    }

    // create full request body (vol and event id come through in query params)
    const req: CreateEmailRequest = {
      ...(await request.json()),
    };

    // validate the request body
    const validationResult = zCreateEmailRequest.safeParse(req);

    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Email').toNextResponse();
    }

    // send email to all volunteers at event
    await sendEventEmail(params.eventId, req);

    return new Response(null, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
