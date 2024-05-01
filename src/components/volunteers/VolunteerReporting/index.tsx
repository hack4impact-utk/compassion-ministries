'use client';
import { VolunteerReportResponse } from '@/server/actions/Reporting';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface VolunteerReportingProps {
  report: VolunteerReportResponse;
  volunteer: VolunteerResponse;
}

export default function VolunteerReporting({
  report,
  volunteer,
}: VolunteerReportingProps) {
  const router = useRouter();
  return (
    <>
      <Box>
        <Typography variant="h5">
          {volunteer.firstName} has volunteered for a total of{' '}
          {report.num_hours} hour{report.num_hours > 1 ? 's' : ''} at{' '}
          {report.num_events} event{report.num_events > 1 ? 's' : ''}.
        </Typography>
        <Typography
          sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
          variant="h6"
          mt={4}
        >
          Affiliated Organizations
        </Typography>
        <List>
          {Object.keys(report.organizations).map((organizationId, i) => {
            const organizationName =
              report.organizations[organizationId].organizationName;
            const hoursWithOrganization =
              report.organizations[organizationId].hoursWithOrganization;
            return (
              <ListItemButton
                key={i}
                onClick={() => router.push(`/organizations/${organizationId}`)}
                sx={{ pl: 0 }}
              >
                <ListItemText
                  primary={organizationName}
                  secondary={`${hoursWithOrganization} hours`}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </>
  );
}
