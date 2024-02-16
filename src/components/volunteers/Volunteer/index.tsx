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
    <div>
      <Typography variant="h1">
        {volunteer.firstName} {volunteer.lastName}
      </Typography>
      <Typography>
        <strong>Email:</strong> {volunteer.email}
      </Typography>
      <Typography>
        <strong>Phone number:</strong> {volunteer.phoneNumber}
      </Typography>
      <Typography>
        <strong>Address:</strong> {volunteer.address}
      </Typography>
      <Typography>
        <strong>Previous role:</strong> {volunteer.previousRole}
      </Typography>
      <Typography>
        <strong>Previous organization:</strong>{' '}
        {volunteer.previousOrganization?.name}
      </Typography>
      <Typography>Role Verifications</Typography>
      <ul>
        {volunteer.roleVerifications?.map((verification, index) => (
          <li key={index}>
            <Typography>
              <strong>Role:</strong> {verification.role}
            </Typography>
            <Typography>
              <strong>Verified by:</strong> {verification.verifier}
            </Typography>
            <Typography>
              <strong>Verification date:</strong>{' '}
              {new Date(verification.lastUpdated).toLocaleDateString()}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
