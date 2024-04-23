import { inititateBackgroundCheck } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest } from 'next/server';

export async function POST(
  _req: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    // await adminAuth();
    const validationResult = zObjectId.safeParse(params.volunteerId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    inititateBackgroundCheck(params.volunteerId);
  } catch (e) {
    return CMErrorResponse(e);
  }
}
