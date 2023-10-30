import { softDeleteOrganization } from '@/server/actions/Organizations';
import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const validationResult = zObjectId.safeParse(params.organizationId);
  if (!validationResult.success) {
    return NextResponse.json(
      { message: 'Invalid Organization Id' },
      { status: 400 }
    );
  }

  const res = await softDeleteOrganization(params.organizationId);
  if (!res) {
    return NextResponse.json(
      { message: 'Organization not found' },
      { status: 404 }
    );
  }
  return new NextResponse(undefined, { status: 204 });
}
