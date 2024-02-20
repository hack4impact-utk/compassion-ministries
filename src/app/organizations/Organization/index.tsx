import React from 'react';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Typography, Box } from '@mui/material';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// Use OrganizationResponse Props
interface OrganizationProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

// OrganizationInfo displays organization information and volunteers who have attended an event by said organization
export default function OrganizationInfo({
  organization,
  volunteers,
}: OrganizationProps): React.ReactElement {
  return (
    <Box>
      <Typography variant="h1">{organization.name}</Typography>
      <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
        {' '}
        Volunteers{' '}
      </Typography>
      {volunteers.map((volunteer, index) => (
        <Typography key={index}>
          {volunteer.firstName} {volunteer.lastName}
        </Typography>
      ))}
    </Box>
  );
}
