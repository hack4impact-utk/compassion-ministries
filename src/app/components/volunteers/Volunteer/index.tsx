'use client';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
}

// VolunteerInfo displays volunteer information
export default function VolunteerInfo({
  volunteer,
}: VolunteerProps): React.ReactElement {

  return (
    <Box>
      <Typography variant="h1">
        {volunteer.firstName} {volunteer.lastName}
      </Typography>
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
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
          Previous role:
        </Typography>
        <Typography display="inline">{volunteer.previousRole}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
          Previous organization:
        </Typography>
        <Typography display="inline">
          {volunteer.previousOrganization?.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5">Role Verifications</Typography>
        <AddIcon sx={{ ml: 1 }} />
      </Box>
      {volunteer.roleVerifications?.map((verification, index) => (
        <Box key={index}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Role:
            </Typography>
            <Typography display="inline">{verification.role}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Verified by:
            </Typography>
            <Typography display="inline">{verification.verifier}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pr: 1 }}>
              Verification date:
            </Typography>
            <Typography display="inline">
              {verification.lastUpdated.toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
