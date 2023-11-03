import { createOrganization } from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';

// @route Post /api/organizations/ - Creates an organization

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const res = await createOrganization(req);

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
