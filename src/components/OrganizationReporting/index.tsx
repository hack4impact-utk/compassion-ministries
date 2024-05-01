import { OrganizationReportResponse } from '@/server/actions/Reporting';
import { Typography } from '@mui/material';

interface OrganizationReportingProps {
  report: OrganizationReportResponse;
}

export default function OrganizationReporting(
  props: OrganizationReportingProps
) {
  const volunteerText =
    props.report.numVolunteers > 1
      ? `a total of ${props.report.numVolunteers} volunteers have volunteered`
      : `one volunteer has volunteered`;
  const hoursText = `${props.report.numHours} hour${
    props.report.numHours > 1 ? 's' : ''
  }`;
  const eventText =
    props.report.numEvents === 1
      ? `at one event!`
      : `at ${props.report.numEvents} different events!`;
  return (
    <Typography variant="h6">
      Through {props.report.organization}, {volunteerText} {hoursText}{' '}
      {eventText}
    </Typography>
  );
}
