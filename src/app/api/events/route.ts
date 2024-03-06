import { createEvent } from '@/server/actions/Event';
import { zCreateEventRequest } from '@/types/dataModel/event';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // validate the request body
  const validationResult = zCreateEventRequest.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: 'Invalid request body',
      },
      { status: 400 }
    );
  }

  try {
    // create the event
    const eventId = await createEvent(validationResult.data);

    return NextResponse.json(
      {
        id: eventId,
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
