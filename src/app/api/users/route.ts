import { updateAllowedUsers } from "@/server/actions/User";
import { zUpdateAllowedUsersRequest } from "@/types/dataModel/user";
import { adminAuth } from "@/utils/auth";
import CMError, { CMErrorResponse, CMErrorType } from "@/utils/cmerror";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await adminAuth();

    const req = await request.json();
    const validationResult = zUpdateAllowedUsersRequest.safeParse(req);
    if (!validationResult.success) {
      throw new CMError(CMErrorType.BadValue, 'Request')
    }

    updateAllowedUsers(validationResult.data)
    return new NextResponse(undefined, { status: 204 })
  } catch (e) {
    return CMErrorResponse(e)
  }
}