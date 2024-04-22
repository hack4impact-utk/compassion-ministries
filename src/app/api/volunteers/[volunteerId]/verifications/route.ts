import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { zRoleVerificationRequest } from '@/types/dataModel/roles';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';
import { deleteVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zVerifiedRole } from '@/types/dataModel/roles';
import { userAuth } from '@/utils/auth';
export async function DELETE(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    await userAuth();

    // Parse volunteerID
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
    if (!objectIdValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    // Create role object, with verifier name autofilled and validate it using zRoleVerification schema
    const req = await request.nextUrl.searchParams.get('role');

    const roleVerificationRequestValidationResult =
      zVerifiedRole.safeParse(req);
    if (!roleVerificationRequestValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Role Verification Request' },
        { status: 400 }
      );
    }

    // delete the volunteer role using deleteVolunteerRole function - volunteerId & role needed
    const res = await deleteVolunteerRoleVerification(
      params.volunteerId,
      roleVerificationRequestValidationResult.data
    );
    if (!res) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    // If the deletion was successful, return a 204 No Content response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // If an internal server error occurs, return a 500 Internal Server Error response

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    await userAuth();

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
