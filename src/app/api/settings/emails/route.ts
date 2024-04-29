import { removeAllowedEmail } from "@/server/actions/Setting";
import { CMErrorResponse } from "@/utils/cmerror";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest
) {
    try {
        const email = request.nextUrl.searchParams.get("email")

        if (email) {
            await removeAllowedEmail(email)
        }
        return new NextResponse(undefined, { status: 204 })
    }
    catch (e) {
        return CMErrorResponse(e)
    }
}