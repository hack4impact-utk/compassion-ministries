import { verifyRole } from '@/server/actions/Volunteers';
import { zObjectId } from '@/types/dataModel/base';
import { zRoleVerificationRequest,
         zVolunteerResponse
} from '@/types/dataModel/volunteer';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH (
  request: NextRequest, 
  { params }: { params: { volunteerId: string } }
) {
  const validationResult = zObjectId.safeParse(params.volunteerId);
  
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Volunteer ID' },
      { status: 400 }
    );
  }

  const vId = validationResult.data;

  // Get the updated volunteer data
  const res = await request.json();
  const verificationRequest = zRoleVerificationRequest.safeParse(res);

  let updatedVolunteer;
  if (verificationRequest.success) {
    updatedVolunteer = await verifyRole(vId, verificationRequest.data);
  } else {
    return NextResponse.json(
      { message: 'Volunteer not found' },
      { status: 400 }
    );
  }

  const responseValidation = zVolunteerResponse.safeParse(updatedVolunteer);
  if (responseValidation.success) {
    return new NextResponse(undefined, { status: 204 });
  } else {
    return new NextResponse(undefined, { status: 400 });
  }
}