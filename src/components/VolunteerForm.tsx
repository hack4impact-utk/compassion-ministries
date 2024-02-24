import React from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// UpsertVolunteerFormData for change, Receive the current volunteer from Volunteer Response
interface VolunteerFormProps {
  onChange: (volunteer: UpsertVolunteerFormData) => void;
  currentVolunteer?: VolunteerResponse;
}

// Volunteer form to update name, email, and number
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

  const isValidEmail = (email: string) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email === '' || isValidEmail(email)) {
      handleChange('email', email);
    }
  };

  const emailError =
    currentVolunteer?.email && !isValidEmail(currentVolunteer.email);

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
        onChange={handleEmailChange}
        error={emailError ? true : undefined}
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
