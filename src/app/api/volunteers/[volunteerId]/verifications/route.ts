import { NextRequest, NextResponse } from 'next/server';
import { deleteVolunteer } from '@/server/actions/Volunteer';
import { mongo } from 'mongoose';
//import { verificationRoles } from '@/types/dataModel/volunteer';
export async function DELETE(
  request: NextRequest
  //{ params }: { params: { volunteerId: string } }
) {
  try {
    //const req = await request.nextUrl.searchParams.get("role");
    //const validationResult = verificationRoles.safeParse(req);
    /*if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Id' },
        { status: 400 }
      );
    }*/
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

    if (error instanceof mongo.MongoServerError) {
      return NextResponse.json({ message: error }, { status: 409 });
    }
    return NextResponse.json({ message: '500 ERROR' }, { status: 500 });
  }
}
