'use client';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { Typography, Box, ListItemButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';
import IconList from '@/components/IconList';
import { useRouter } from 'next/navigation';
import AddRoleVerificationDialog from '@/components/AddRoleVerificationDialog';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData: UpsertRoleVerificationFormData) => {
    try {
      const res = await fetch(
        `/api/volunteers/${volunteer._id}/verifications`,
        {
          method: 'PATCH',
          body: JSON.stringify(formData),
        }
      );
      if (res.status == 204) {
        handleClose();
      } else {
        const data = await res.json();
        console.error('Failed to add verification', data);
      }
    } catch (error) {
      console.error('Failed to add verification', error);
    }
  };

  const router = useRouter();
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h3" pt={2} pb={2}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }} pt={4}>
            <Typography variant="h5">Role Verifications</Typography>
            <AddIcon sx={{ ml: 1, color: '#808080' }} onClick={handleOpen} />
          </Box>
          {volunteer.roleVerifications?.map((verification, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', pr: 1 }}
                >
                  Role:
                </Typography>
                <Typography display="inline">{verification.role}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', pr: 1 }}
                >
                  Verified by:
                </Typography>
                <Typography display="inline">
                  {verification.verifier}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Typography
              sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
              variant="h6"
              mt={4}
            >
              Attended Events
            </Typography>
            {events.map((volunteerEvent, i) => (
              <ListItemButton
                key={i}
                onClick={() =>
                  router.push(`/events/${volunteerEvent.event._id}`)
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} pt={1}>
                  <IconList roles={[volunteerEvent.role]}></IconList>
                  <Typography pl={2}>{volunteerEvent.event.name}</Typography>
                </Box>
              </ListItemButton>
            ))}
          </Box>
        )}
      </Box>
      <AddRoleVerificationDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
