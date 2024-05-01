import { removeAdmin } from '@/server/actions/User';
import { zObjectId } from '@/types/dataModel/base';
import { adminAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await adminAuth();

    const validationResult = zObjectId.safeParse(params.userId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'User Id').toNextResponse();
    }

    await removeAdmin(params.userId);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
