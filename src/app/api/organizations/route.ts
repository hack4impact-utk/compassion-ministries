import { createOrganization } from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';

// @route Post /api/organizations/ - Creates an organization

export async function POST(request: NextRequest) {
  const req = await request.json();

  const res = await createOrganization(req);
  if (!res) {
    return NextResponse.json({ message: 'Conflict' }, { status: 409 });
  }

  return NextResponse.json({ id: res }, { status: 201 });
}
