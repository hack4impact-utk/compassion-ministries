import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { getRangesOverlap } from '@/utils/math';
import {
  getAllEventsForVolunteer,
  getVolunteerEventsByOrganization,
} from './Volunteer';

export interface OrganizationReportResponse {
  organization: string;
  numVolunteers: number;
  numHours: number;
  numEvents: number;
}

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
): Promise<OrganizationReportResponse> {
  // Return object
  const report: OrganizationReportResponse = {
    organization: organizationId,
    numVolunteers: 0,
    numHours: 0,
    numEvents: 0,
  };

  // used to count number of unique events
  const eventsSet = new Set();

  // Get search range
  const fromTime = startDate?.valueOf();
  const toTime = endDate?.valueOf();

  // If valid search range, calculate num volunteers and hours
  if (fromTime == undefined || toTime == undefined || toTime > fromTime) {
    // Get all event volunteers under organization
    const volunteerEvents: VolunteerEventResponse[] =
      await getVolunteerEventsByOrganization(organizationId);

    report.organization = volunteerEvents[0].organization!.name;

    // Iterate over eventVolunteers to get unique volunteer ids and total time for all records within search range
    const volunteerIds: Set<string> = new Set<string>();
    let volunteerTime: number = 0;
    for (const volunteerEvent of volunteerEvents) {
      eventsSet.add(volunteerEvent._id);
      // Get event time range
      let timeRange: [number, number] | undefined = [
        volunteerEvent.event.startAt.valueOf(),
        volunteerEvent.event.endAt.valueOf(),
      ];

      // Bound start and end time within search range
      if (fromTime != undefined || toTime != undefined) {
        timeRange = getRangesOverlap([
          timeRange,
          [fromTime ?? timeRange[0], toTime ?? timeRange[1]],
        ]);
      }

      // If event intersects search range, record info
      if (timeRange != undefined) {
        // Add volunteer id to set of unique volunteer ids
        volunteerIds.add(volunteerEvent.volunteer);
        // Add event time within search range to total time volunteered
        volunteerTime += timeRange[1] - timeRange[0];
      }
    }

    // Update return object
    report.numVolunteers = volunteerIds.size;
    report.numHours = volunteerTime / 3600000; // convert milliseconds to hours
  }

  report.numEvents = eventsSet.size;
  report.numHours = Math.round(report.numHours);

  return report;
}

/**
 * Gets statistics for volunteering efforts by a particular volunteer, optionally bounded to events within a search range
 * @param volunteerId Id of volunteer to generate statistics for
 * @param startDate Lower bound on search range for event volunteer records
 * @param endDate Upper bound on search range for event volunteer records
 * @returns Total volunteer hours and number of unique volunteers associated with the volunteer within the search range
 */
export async function getVolunteerReport(
  volunteerId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  volunteer: string;
  num_events: number;
  num_hours: number;
}> {
  // Return object
  const report = {
    volunteer: volunteerId,
    num_events: 0,
    num_hours: 0,
  };

  // Get search range
  const fromTime = startDate?.valueOf();
  const toTime = endDate?.valueOf();

  // If valid search range, calculate num events and hours
  if (fromTime == undefined || toTime == undefined || toTime > fromTime) {
    // Get all event volunteers under organization
    const volunteerEvents: VolunteerEventResponse[] =
      await getAllEventsForVolunteer(volunteerId);

    // Iterate over eventVolunteers to get unique event ids and total time for all records within search range
    const eventsId: Set<string> = new Set<string>();
    let volunteerTime: number = 0;
    for (const volunteerEvent of volunteerEvents) {
      // Get event time range
      let timeRange: [number, number] | undefined = [
        volunteerEvent.event.startAt.valueOf(),
        volunteerEvent.event.endAt.valueOf(),
      ];

      // Bound start and end time within search range
      if (fromTime != undefined || toTime != undefined) {
        timeRange = getRangesOverlap([
          timeRange,
          [fromTime ?? timeRange[0], toTime ?? timeRange[1]],
        ]);
      }

      // If event intersects search range, record info
      if (timeRange != undefined) {
        // Add event id to set of unique event ids
        eventsId.add(volunteerEvent.event._id);
        // Add event time within search range to total time volunteered
        volunteerTime += timeRange[1] - timeRange[0];
      }
    }

    // Update return object
    report.num_events = eventsId.size;
    report.num_hours = volunteerTime / 3600000; // convert milliseconds to hours
  }

  return report;
}
