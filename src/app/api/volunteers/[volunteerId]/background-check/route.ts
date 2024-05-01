import { inititateBackgroundCheck } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { adminAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _req: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    await adminAuth();
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    await inititateBackgroundCheck(params.volunteerId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
