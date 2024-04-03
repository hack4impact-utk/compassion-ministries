import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { getEvent } from './Event';
import { EventResponse } from '@/types/dataModel/event';
import { getEventVolunteersByOrganization } from './EventVolunteers';
import { getRangesOverlap } from '@/utils/math';
import { ObjectId } from 'mongodb';

/**
 * Gets statistics for volunteering efforts for an organization, optionally bounded to events within a search range
 * @param organizationId Id of organization to generate statistics for
 * @param startDate Lower bound on search range for event volunteer records
 * @param endDate Upper bound on search range for event volunteer records
 * @returns Total volunteer hours and number of unique volunteers associated with the organization within the search range
 */
export async function getOrganizationReport(
  organizationId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  organization: ObjectId;
  num_volunteers: number;
  num_hours: number;
}> {
  // Return object
  const report = {
    organization: new ObjectId(organizationId),
    num_volunteers: 0,
    num_hours: 0,
  };

  // Get search range
  const fromTime = startDate?.valueOf();
  const toTime = endDate?.valueOf();

  // If valid search range, calculate num volunteers and hours
  if (fromTime == undefined || toTime == undefined || toTime > fromTime) {
    // Get all event volunteers under organization
    const eventVolunteers: EventVolunteerResponse[] =
      await getEventVolunteersByOrganization(organizationId);

    // Iterate over eventVolunteers to get unique volunteer ids and total time for all records within search range
    const volunteerIds: Set<string> = new Set<string>();
    let volunteerTime: number = 0;
    for (const eventVolunteer of eventVolunteers) {
      const event: EventResponse = await getEvent(eventVolunteer.event);
      // Bound start and end time within search range
      let timeRange: [number, number] = [
        event.startAt.valueOf(),
        event.endAt.valueOf(),
      ];
      timeRange = getRangesOverlap([
        timeRange,
        [
          fromTime != undefined ? fromTime : timeRange[0],
          toTime != undefined ? toTime : timeRange[1],
        ],
      ]);
      // If event intersects search range, record info
      if (timeRange[0] < timeRange[1]) {
        // Add volunteer id to set of unique volunteer ids
        volunteerIds.add(eventVolunteer.volunteer._id);
        // Add event time within search range to total time volunteered
        volunteerTime += timeRange[1] - timeRange[0];
      }
    }

    // Update return object
    report.num_volunteers = volunteerIds.size;
    report.num_hours = volunteerTime / 3600000; // convert milliseconds to hours
  }

  return report;
}
