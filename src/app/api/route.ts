import { createOrganization } from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';

//import OrganizationDocument from '@/server/models/Organization';
//import OrganizationModel from '@/server/models/Organization';
//import { CreateOrganizationRequest } from '@/types/dataModel/organization';

export async function POST(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const res = await createOrganization(params.name);
  if (!res) {
    return NextResponse.json({ message: 'Conflict' }, { status: 409 });
  }

  return NextResponse.json(
    { message: 'Organization Created' },
    { status: 201 }
  );
}
