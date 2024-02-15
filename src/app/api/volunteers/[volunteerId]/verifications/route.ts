import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import {
  zRoleVerification,
  zRoleVerificationRequest,
} from '@/types/dataModel/roles';
import { NextRequest, NextResponse } from 'next/server';
import { deleteVolunteerRole } from '@/server/actions/Volunteer';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    // Get Query & Parse volunteerID
    const req = await request.json();
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
    if (!objectIdValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    // Create role object, with verifier name autofilled and validate it using zRoleVerification schema
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

    // delete the volunteer role using deleteVolunteerRole function - volunteerId & role needed
    const res = await deleteVolunteerRole(params.volunteerId, req.role);
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
