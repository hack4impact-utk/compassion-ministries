import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { zRoleVerificationRequest } from '@/types/dataModel/roleVerifications';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
  if (!objectIdValidationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer Id' },
      { status: 400 }
    );
  }

  const body = await request.json();
  const roleVerificationRequestValidationResult =
    zRoleVerificationRequest.safeParse(body);
  if (!roleVerificationRequestValidationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Role Verification Request' },
      { status: 400 }
    );
  }

  try {
    await upsertVolunteerRoleVerification(
      params.volunteerId,
      roleVerificationRequestValidationResult.data
    );

    return new NextResponse(undefined, { status: 204 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
