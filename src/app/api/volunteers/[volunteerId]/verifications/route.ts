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
    console.log('ASDF');
    return NextResponse.json({ id: res }, { status: 204 });
  } catch (error) {
    if (error instanceof mongo.MongoServerError) {
      return NextResponse.json({ message: error }, { status: 409 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
