import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

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
  const [formData, setVolunteerData] =
    useState<UpsertVolunteerFormData>(volunteerData);

  useEffect(() => {
    if (currentVolunteer) {
      // Update form data with current volunteer data
      setVolunteerData({
        firstName: currentVolunteer.firstName || '',
        lastName: currentVolunteer.lastName || '',
        email: currentVolunteer.email || '',
        phoneNumber: currentVolunteer.phoneNumber || '',
        address: currentVolunteer.address || '',
      });
    }
  }, [currentVolunteer]);

  const handleChange = (
    field: keyof UpsertVolunteerFormData,
    value: string
  ) => {
    // Update form data
    setVolunteerData({
      ...formData,
      [field]: value,
    });
    // Notify parent component about the change
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    handleChange('email', email);
  };

  const emailError = formData.email && !isValidEmail(formData.email);

  return (
    <Box pt={2}>
      <TextField
        label="First Name"
        value={formData.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        InputLabelProps={{ shrink: !!formData.firstName }}
      />
      <TextField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        InputLabelProps={{ shrink: !!formData.lastName }}
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleEmailChange}
        error={emailError ? true : undefined}
        InputLabelProps={{ shrink: !!formData.email }}
      />
      <TextField
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) => handleChange('phoneNumber', e.target.value)}
        InputLabelProps={{ shrink: !!formData.phoneNumber }}
      />
      <TextField
        label="Address"
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        InputLabelProps={{ shrink: !!formData.address }}
      />
    </Box>
  );
}

export default VolunteerForm;
