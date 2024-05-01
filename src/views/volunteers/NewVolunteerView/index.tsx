'use client';
import React, { useState } from 'react';
import VolunteerForm from '@/components/VolunteerForm';
import {
  UpsertVolunteerFormData,
  zUpsertVolunteerFormData,
} from '@/types/forms/volunteer';
import { Box, Typography } from '@mui/material';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import { ValidationErrors } from '@/utils/validation';
import useValidation from '@/hooks/useValidation';
import LoadingButton from '@/components/LoadingButton';

export default function NewVolunteerView() {
  const [volunteer, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<UpsertVolunteerFormData> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const validate = useValidation(zUpsertVolunteerFormData);

  const [isLoading, setIsLoading] = useState(false);
  const submitData = async () => {
    // remove the phone number formatting
    volunteer.phoneNumber = volunteer.phoneNumber.replace(/\D/g, '');
    // Validate the form
    const validationResult = validate(volunteer);
    if (validationResult) {
      setValidationErrors(validationResult);
      return;
    }

    // Clear validation errors
    setValidationErrors(undefined);

    try {
      setIsLoading(true);
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteer),
      });

      const data = await res.json();

      if (res.status !== 201) {
        showSnackbar(data.message, 'error');
        return;
      }

      router.push(`/volunteers/${data.id}`);
      router.refresh();
      showSnackbar('Volunteer created successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to create volunteer', 'error');
      console.error(e);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4">New Volunteer</Typography>
      <VolunteerForm
        onChange={setVolunteerData}
        volunteerData={volunteer}
        errors={validationErrors}
      />
      <LoadingButton 
        loading={isLoading}
        variant="contained" 
        fullWidth type="submit" 
        onClick={submitData}>
        Submit
      </LoadingButton>
    </Box>
  );
}
