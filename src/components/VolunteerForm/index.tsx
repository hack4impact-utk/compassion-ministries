//import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { useEffect } from 'react';
import { ValidationErrors } from '@/utils/validation';
interface VolunteerFormProps {
  onChange: (volunteer: UpsertVolunteerFormData) => void;
  currentVolunteer?: VolunteerResponse;
  volunteerData: UpsertVolunteerFormData;
  errors?: ValidationErrors<UpsertVolunteerFormData>;
}

function VolunteerForm({
  onChange,
  currentVolunteer,
  volunteerData,
  errors,
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
        sx={{ mb: 2 }}
        error={!!errors?.firstName}
        helperText={errors?.firstName}
      />
      <TextField
        label="Last Name"
        value={volunteerData.lastName || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, lastName: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.lastName }}
        sx={{ mb: 2 }}
        error={!!errors?.lastName}
        helperText={errors?.lastName}
      />
      <TextField
        label="Email"
        type="email"
        value={volunteerData.email || ''}
        onChange={(e) => onChange({ ...volunteerData, email: e.target.value })}
        InputLabelProps={{ shrink: !!volunteerData.email }}
        sx={{ mb: 2 }}
        error={!!errors?.email}
        helperText={errors?.email}
      />
      <TextField
        label="Phone Number"
        value={volunteerData.phoneNumber || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, phoneNumber: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.phoneNumber }}
        sx={{ mb: 2 }}
        error={!!errors?.phoneNumber}
        helperText={errors?.phoneNumber}
      />
      <TextField
        label="Address"
        value={volunteerData.address || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, address: e.target.value })
        }
        InputLabelProps={{ shrink: !!volunteerData.address }}
        sx={{ mb: 2 }}
        error={!!errors?.address}
        helperText={errors?.address}
      />
    </Box>
  );
}

export default VolunteerForm;
