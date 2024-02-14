import { upsertVolunteerRoleVerification } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { zRoleVerificationRequest } from '@/types/dataModel/roles';
import { NextRequest, NextResponse } from 'next/server';
import { deleteVolunteer } from '@/server/actions/Volunteer';
//import { mongo } from 'mongoose';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);
    if (!objectIdValidationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Volunteer Id' },
        { status: 400 }
      );
    }

    const req = await request.json();
    const res = await deleteVolunteer(req);

    if (!res) {
      return NextResponse.json(
        { message: 'Volunteer not found' },
        { status: 404 }
      );
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE endpoint:', error);

    /*
    if (error instanceof mongo.MongoServerError) {
      return NextResponse.json({ message: error }, { status: 409 });
    }*/
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
