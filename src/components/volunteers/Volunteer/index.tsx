import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Typography, Box } from '@mui/material';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import IconList from '@/components/IconList';

// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
  events: VolunteerEventResponse[];
}

// VolunteerInfo displays volunteer information
export default function Volunteer({
  volunteer,
  events,
}: VolunteerProps): React.ReactElement {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography variant="h3" pt={2}>
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
        <Typography variant="h5" mt={4}>
          Role Verifications
        </Typography>
        {volunteer.roleVerifications?.map((verification, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', pr: 1 }}
              >
                Role:
              </Typography>
              <Typography display="inline">{verification.role}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', pr: 1 }}
              >
                Verified by:
              </Typography>
              <Typography display="inline">{verification.verifier}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', pr: 1 }}
              >
                Verification date:
              </Typography>
              <Typography display="inline">
                {new Date(verification.lastUpdated).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {events.length > 0 && (
        <Box>
          <Typography variant="h5" mt={4}>
            Attended Events
          </Typography>
          {events.map((volunteerEvent, i) => (
            <Box key={i} sx={{ display: 'flex' }} pt={1}>
              <IconList roles={[volunteerEvent.role]}></IconList>
              <Typography pl={2}>{volunteerEvent.event.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
