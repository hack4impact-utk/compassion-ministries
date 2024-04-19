'use client';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { Typography, Box, ListItemButton, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';
import IconList from '@/components/IconList';
import { useRouter } from 'next/navigation';
import AddRoleVerificationDialog from '@/components/AddRoleVerificationDialog';
import { formatPhoneNumber } from '@/utils/phone-number';
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

  const formattedPhoneNumber = formatPhoneNumber(volunteer.phoneNumber);
  const router = useRouter();
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h3" pt={2} pb={2}>
            {volunteer.firstName} {volunteer.lastName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Email:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {volunteer.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Phone number:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {formattedPhoneNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Address:
            </Typography>
            <Typography display="inline" fontWeight="normal" variant="h6">
              {volunteer.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
              Previous organization:
            </Typography>
            <Typography display="inline" variant="h6">
              <ListItemButton
                key={volunteer.previousOrganization?._id}
                onClick={() =>
                  router.push(
                    `/organizations/${volunteer.previousOrganization?._id}`
                  )
                }
              >
                <ListItemText
                  primary={volunteer.previousOrganization?.name}
                  primaryTypographyProps={{
                    variant: 'h6',
                    fontWeight: 'normal',
                  }}
                />
              </ListItemButton>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }} pt={4}>
            <Typography variant="h5">Role Verifications</Typography>
            <AddIcon sx={{ ml: 1, color: '#808080' }} onClick={handleOpen} />
          </Box>
          {volunteer.roleVerifications?.map((verification, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Role:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {verification.role}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Verified by:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
                  {verification.verifier}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', pr: 1 }}>
                  Verification date:
                </Typography>
                <Typography display="inline" variant="h6" fontWeight="normal">
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
                sx={{ pl: 0 }}
              >
                <Box>
                  <IconList roles={[volunteerEvent.role]}></IconList>
                </Box>
                <ListItemText
                  sx={{ pl: 1 }}
                  primary={`${volunteerEvent.event.name}`}
                  primaryTypographyProps={{
                    variant: 'h5',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
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
