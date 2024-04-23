import { NextRequest, NextResponse } from 'next/server';
import zBackgroundCheckWebhookPayload from '@/types/dataModel/backgroundCheckWebhookPayload';
import { handleBackgroundCheckWebhook } from '@/server/actions/webhooks';
import { CMErrorResponse } from '@/utils/cmerror';

// @route POST /api/bc-webhook - Updates a volunteer's background check status
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    console.log(req);
    const validationResult = zBackgroundCheckWebhookPayload.safeParse(req);
    if (!validationResult.success) {
      // return early but with a 200 status code for adding a webhook
      return new NextResponse(undefined, { status: 200 });
    }

    const res = await handleBackgroundCheckWebhook(validationResult.data);
    if (res == null) {
      return NextResponse.json({ id: 'Not Found' }, { status: 404 });
    }
    return new NextResponse(undefined, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
