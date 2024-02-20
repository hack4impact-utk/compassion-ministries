import React from 'react';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Typography, Box } from '@mui/material';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// Use OrganizationResponse Props
interface OrganizationProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

// OrganizationInfo displays organization information
export default function OrganizationInfo({
  organization,
  volunteers,
}: OrganizationProps): React.ReactElement {
  return (
    <Box>
      <Typography variant="h1">{organization.name}</Typography>
      <Typography variant="h5">Volunteers</Typography>
      {volunteers.map((volunteer, index) => (
        <Box key={index}>
          <Box sx={{ display: 'flex' }}>
            <Typography display="inline">
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography display="inline">{volunteer.email}</Typography>
          </Box>
          <br />
        </Box>
      ))}
    </Box>
  );
}
