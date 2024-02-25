//import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { useEffect } from 'react';
interface VolunteerFormProps {
  onChange: (volunteer: UpsertVolunteerFormData) => void;
  currentVolunteer?: VolunteerResponse;
  volunteerData: UpsertVolunteerFormData;
}

function VolunteerForm({
  onChange,
  currentVolunteer,
  volunteerData,
}: VolunteerFormProps) {
  useEffect(() => {
    if (currentVolunteer) {
      // Update form data with current volunteer data
      onChange({
        firstName: currentVolunteer.firstName || '',
        lastName: currentVolunteer.lastName || '',
        email: currentVolunteer.email || '',
        phoneNumber: currentVolunteer.phoneNumber || '',
        address: currentVolunteer.address || '',
      });
    }
  }, [currentVolunteer, onChange]);

  return (
    <Box pt={2}>
      <TextField
        label="First Name"
        value={volunteerData.firstName || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, firstName: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.firstName }}
      />
      <TextField
        label="Last Name"
        value={volunteerData.lastName || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, lastName: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.lastName }}
      />
      <TextField
        label="Email"
        type="email"
        value={volunteerData.email || ''}
        onChange={(e) => onChange({ ...volunteerData, email: e.target.value })}
        InputLabelProps={{ shrink: !!volunteerData.email }}
      />
      <TextField
        label="Phone Number"
        value={volunteerData.phoneNumber || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, phoneNumber: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.phoneNumber }}
      />
      <TextField
        label="Address"
        value={volunteerData.address || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, address: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.address }}
      />
    </Box>
  );
}

export default VolunteerForm;
