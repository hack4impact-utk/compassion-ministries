import { createEvent } from '@/server/actions/Event';
import { zCreateEventRequest } from '@/types/dataModel/event';
import { userAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await userAuth();

    const body = await req.json();

    // validate the request body
    const validationResult = zCreateEventRequest.safeParse(body);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Event').toNextResponse();
    }

    const eventId = await createEvent(validationResult.data);

    return NextResponse.json({ id: eventId }, { status: 201 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
