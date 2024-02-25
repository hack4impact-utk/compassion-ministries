import { rrulestr } from "rrule";

export function datesBetweenFromRrule(
    rrule: string,
    startDate: Date,
    endDate: Date    
): Date[] {
    const rrule1 = rrulestr(rrule);
    return rrule1.between(startDate, endDate);   
}