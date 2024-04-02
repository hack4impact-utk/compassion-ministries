import { NextRequest, NextResponse } from 'next/server';
import zBackgroundCheckWebhookPayload from '@/types/dataModel/BackgroundCheckWebhookPayload';
import { handleBackgroundCheckWebhook } from '@/server/actions/handleBackgroundCheckWebhook ';
import CMError, { CMErrorType, CMErrorResponse } from '@/utils/cmerror';

// @route POST /api/volunteers - Creates a volunteer
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zBackgroundCheckWebhookPayload.safeParse(req);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    const res = await handleBackgroundCheckWebhook(validationResult.data);
    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
