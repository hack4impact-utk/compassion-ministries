'use client';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { getRoleIcons } from '@/utils/role';
import { Typography, Box, Modal, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RoleVerificationForm from '@/components/RoleVerificationForm';
import { VerifiedRole } from '@/types/dataModel/roles';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';

// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
  events: VolunteerEventResponse[];
}

const roleVerificationData: UpsertRoleVerificationFormData = {
  role: 'Medical' as VerifiedRole,
  verifier: '',
};

// VolunteerInfo displays volunteer information
export default function Volunteer({
  volunteer,
  events,
}: VolunteerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState(roleVerificationData);

  const onSubmit = async () => {
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

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography variant="h3">
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
          <AddIcon sx={{ ml: 1 }} onClick={handleOpen} />
          <Modal open={open} onClose={handleClose}>
            <Box sx={{ bgcolor: 'background.paper' }}>
              <RoleVerificationForm
                roleVerificationData={formData}
                onChange={(e) => {
                  setFormData(e);
                }}
              />
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
            </Box>
          </Modal>
        </Box>
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
              {getRoleIcons([volunteerEvent.role])}
              <Typography pl={2}>{volunteerEvent.event.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
