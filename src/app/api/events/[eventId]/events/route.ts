import { getEventsBetweenDates } from "@/server/actions/Event";
import { NextResponse } from "next/server";

// @GET function that calls getEventsBetweenDates
// Path: src/app/api/events/%5BeventId%5D/events/route.ts

export async function GET(
) {
  try {

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    // call the getEventsBetweenDates function
    const res = await getEventsBetweenDates(startDate, endDate);

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}