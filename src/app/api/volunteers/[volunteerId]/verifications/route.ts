import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import {
  zRoleVerification,
  zRoleVerificationRequest,
} from '@/types/dataModel/roles';
import { NextRequest, NextResponse } from 'next/server';
import { deleteVolunteer } from '@/server/actions/Volunteer';

export async function DELETE(request: NextRequest) {
  try {
    const req = await request.json();
    const objectIdValidationResult = zObjectId.safeParse(req.volunteerId);
    if (!objectIdValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    const roles = {
      verifier: req.name ? req.name : '',
      lastUpdated: new Date(),
      role: req.role,
    };
    const roleVerificationRequestValidationResult =
      zRoleVerification.safeParse(roles);

    if (!roleVerificationRequestValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Role Verification Request' },
        { status: 400 }
      );
    }

    const res = await deleteVolunteer(req);
    if (!res) {
      return NextResponse.json(
        { message: 'Volunteer not found' },
        { status: 404 }
      );
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: '500 ERROR' }, { status: 500 });
  }
}

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
