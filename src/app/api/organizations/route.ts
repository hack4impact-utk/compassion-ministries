import { createOrganization } from '@/server/actions/Organizations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: NextRequest
  //{ params }: { params: { name: string, softDelete: boolean } }
) {
  const res = await createOrganization(); //params.name, params.softDelete);
  if (!res) {
    return NextResponse.json({ message: 'Conflict' }, { status: 409 });
  }

  return NextResponse.json({ id: res }, { status: 201 });
}
