import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Typography } from '@mui/material';

// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
}

// VolunteerInfo displays volunteer information
export default function VolunteerInfo({
  volunteer,
}: VolunteerProps): React.ReactElement {
  return (
    <Typography component="div">
      <Typography variant="h1">
        {volunteer.firstName} {volunteer.lastName}
      </Typography>
      <Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: 'bold' }}
        >
          Email:
        </Typography>{' '}
        {volunteer.email}
      </Typography>
      <Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: 'bold' }}
        >
          Phone number:
        </Typography>{' '}
        {volunteer.phoneNumber}
      </Typography>
      <Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: 'bold' }}
        >
          Address:
        </Typography>{' '}
        {volunteer.address}
      </Typography>
      <Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: 'bold' }}
        >
          Previous role:
        </Typography>{' '}
        {volunteer.previousRole}
      </Typography>
      <Typography>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: 'bold' }}
        >
          Previous organization:
        </Typography>{' '}
        {volunteer.previousOrganization?.name}
      </Typography>
      <Typography>Role Verifications</Typography>
      <Typography component="ul">
        {volunteer.roleVerifications?.map((verification, index) => (
          <Typography component="li" key={index}>
            <Typography>
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ fontWeight: 'bold' }}
              >
                Role:
              </Typography>{' '}
              {verification.role}
            </Typography>
            <Typography>
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ fontWeight: 'bold' }}
              >
                Verified by:
              </Typography>{' '}
              {verification.verifier}
            </Typography>
            <Typography>
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ fontWeight: 'bold' }}
              >
                Verification date:
              </Typography>{' '}
              {new Date(verification.lastUpdated).toLocaleDateString()}
            </Typography>
          </Typography>
        ))}
      </Typography>
    </Typography>
  );
}
