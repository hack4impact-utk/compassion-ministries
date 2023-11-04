import { NextResponse } from 'next/server';
import { getAllOrganizations } from '@/server/actions/Organizations';

// @route GET /api/organizations - Get all organizations
export async function GET() {
  try {
    const organizations = await getAllOrganizations();

    if (!organizations) {
      throw new Error('Organization not found');
    }
    return NextResponse.json(organizations, { status: 200 });
  } catch (e) {
    let status = 500; // Default to Internal Server Error status
    let message = 'Internal Server Error';

    if ((e as Error).message === 'Organization not found') {
      status = 404;
      message = 'Organization not found';
    }

    return new NextResponse(message as BodyInit, { status });
  }
}
