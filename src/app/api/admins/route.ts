import { addAdmins } from '@/server/actions/User';
import { zAddAdminRequest } from '@/types/dataModel/user';
import { adminAuth } from '@/utils/auth';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    await adminAuth();

    const userIds = await req.json();

    const validationResult = zAddAdminRequest.safeParse(userIds);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'User').toNextResponse();
    }

    await addAdmins(userIds);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
