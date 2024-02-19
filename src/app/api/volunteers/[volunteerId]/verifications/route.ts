import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { zRoleVerificationRequest } from '@/types/dataModel/roles';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
    if (!objectIdValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    const body = await request.json();
    const roleVerificationRequestValidationResult =
      zRoleVerificationRequest.safeParse(body);
    if (!roleVerificationRequestValidationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'Role Verification Request'
      ).toNextResponse();
    }

    await upsertVolunteerRoleVerification(
      params.volunteerId,
      roleVerificationRequestValidationResult.data
    );

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
