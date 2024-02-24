import React from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

interface VolunteerFormProps {
  onChange: (volunteer: UpsertVolunteerFormData) => void;
  currentVolunteer?: VolunteerResponse;
}
function VolunteerForm({ onChange, currentVolunteer }: VolunteerFormProps) {
  const handleChange = (
    field: keyof UpsertVolunteerFormData,
    value: string
  ) => {
    if (currentVolunteer) {
      onChange({
        ...currentVolunteer,
        [field]: value,
      });
    }
  };

  return (
    <Box>
      <TextField
        label="First Name"
        value={currentVolunteer?.firstName || ''}
        onChange={(e) => handleChange('firstName', e.target.value)}
      />
      <TextField
        label="Last Name"
        value={currentVolunteer?.lastName || ''}
        onChange={(e) => handleChange('lastName', e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        value={currentVolunteer?.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <TextField
        label="Phone Number"
        value={currentVolunteer?.phoneNumber || ''}
        onChange={(e) => handleChange('phoneNumber', e.target.value)}
      />
      <TextField
        label="Address"
        value={currentVolunteer?.address || ''}
        onChange={(e) => handleChange('address', e.target.value)}
      />
    </Box>
  );
}

export default VolunteerForm;
