'use client';
import React from 'react';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Typography, Box, ListItemButton } from '@mui/material';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { useRouter } from 'next/navigation';

// Use OrganizationResponse Props
interface OrganizationProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

// OrganizationInfo displays organization information and volunteers who have attended an event by said organization
export default function Organization({
  organization,
  volunteers,
}: OrganizationProps): React.ReactElement {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3">{organization.name}</Typography>

      <Typography
        sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
        variant="h6"
        mt={4}
      >
        Volunteers
      </Typography>
      {volunteers.map((volunteer, index) => (
        <ListItemButton
          key={index}
          onClick={() => router.push(`/volunteers/${volunteer._id}`)}
          sx={{ pl: 0 }}
        >
          <Typography variant="h5">
            {volunteer.firstName} {volunteer.lastName}
          </Typography>
        </ListItemButton>
      ))}
    </Box>
  );
}
