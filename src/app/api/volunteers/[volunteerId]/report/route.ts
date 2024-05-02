import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { userAuth } from '@/utils/auth';
import { getVolunteerReport } from '@/server/actions/Reporting';

// @route GET /api/volunteers/[volunteerId]/report - Gets a report about the organizaton including number of events, organizations, and hours served
export async function GET(
  _request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    await userAuth();

    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    const res = await getVolunteerReport(params.volunteerId);

    // no 404 here because the volutneer report never returns null. It will just return reporting values of 0.

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
