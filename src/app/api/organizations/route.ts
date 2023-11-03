import { NextResponse } from 'next/server';
import { getAllOrganizations } from '@/server/actions/Organizations';

// @route GET /api/organizations - Get all organizations
export async function GET() {
  const organizations = await getAllOrganizations();

  if (!organizations) {
    return NextResponse.json(
      { message: 'Organization not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(organizations, { status: 200 });
}
