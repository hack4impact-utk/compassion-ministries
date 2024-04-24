import { removeAllowedEmail } from "@/server/actions/Setting";
import { zRemoveAllowedEmailRequest } from "@/types/dataModel/settings";
import CMError, { CMErrorResponse, CMErrorType } from "@/utils/cmerror";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest
) {
    try {
        const req = await request.json()
        const validationResult = zRemoveAllowedEmailRequest.safeParse(req)
        if (!validationResult.success) {
            return new CMError(CMErrorType.BadValue, 'Request').toNextResponse();
        }
        await removeAllowedEmail(validationResult.data.email)
        return new NextResponse(undefined, { status: 204 })
    }
    catch (e) {
        return CMErrorResponse(e)
    }
}