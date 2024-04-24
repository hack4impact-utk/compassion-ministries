import { zObjectId } from '@/types/dataModel/base';
import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { userAuth } from '@/utils/auth';
import { getOrganizationReport } from '@/server/actions/Reporting';

// @route GET /api/organizations/[organizationId] - Gets a report about the organizaton
export async function GET(
  _request: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  try {
    await userAuth();

    const validationResult = zObjectId.safeParse(params.organizationId);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'Organization Id'
      ).toNextResponse();
    }

    const res = await getOrganizationReport(params.organizationId);
    if (!res) {
      return NextResponse.json(
        { id: 'Organization not found' },
        { status: 404 }
      );
    }
    return new NextResponse({ id: res }, { status: 200 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
