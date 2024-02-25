import { rrulestr } from "rrule";

export default function DatesBetweenFromRrule(
    rrule: string,
    startDate: Date,
    endDate: Date    
): Date[] {
    const rrule1 = rrulestr(rrule);
    return rrule1.between(startDate, endDate);   
}