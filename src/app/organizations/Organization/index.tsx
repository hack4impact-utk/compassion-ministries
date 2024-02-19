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
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
          Address:
        </Typography>
        <Typography display="inline">{organization.address}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
          Phone number:
        </Typography>
        <Typography display="inline">{organization.phoneNumber}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
          Email:
        </Typography>
        <Typography display="inline">{organization.email}</Typography>
      </Box>
      <Typography variant="h5">Volunteers</Typography>
      {volunteers.map((volunteer, index) => (
        <Box key={index}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Name:
            </Typography>
            <Typography display="inline">
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Email:
            </Typography>
            <Typography display="inline">{volunteer.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Phone number:
            </Typography>
            <Typography display="inline">{volunteer.phoneNumber}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
