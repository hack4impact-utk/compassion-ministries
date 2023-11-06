import { createOrganization } from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateOrganizationRequest } from '@/types/dataModel/organization';

// @route Post /api/organizations/ - Creates an organization

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const validationResult = zCreateOrganizationRequest.safeParse(req);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid Organization Name' },
        { status: 400 }
      );
    }
    const res = await createOrganization(validationResult.data);

    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    if ((error = 11000)) {
      return NextResponse.json(
        { message: 'Conflict: Duplicate Entry' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
