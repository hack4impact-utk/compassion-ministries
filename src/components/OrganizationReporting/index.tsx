import { OrganizationReportResponse } from '@/server/actions/Reporting';
import { Typography } from '@mui/material';

interface OrganizationReportingProps {
  report: OrganizationReportResponse;
}

export default function OrganizationReporting(
  props: OrganizationReportingProps
) {
  return (
    <Typography>
      Through {props.report.organization}, a total of{' '}
      {props.report.numVolunteers} volunteers have volunteered{' '}
      {props.report.numHours} hours at {props.report.numEvents} different
      events!
    </Typography>
  );
}
