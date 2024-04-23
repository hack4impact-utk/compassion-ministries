'use client';
import React, { useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerForm from '@/components/VolunteerForm';
import {
  UpsertVolunteerFormData,
  zUpsertVolunteerFormData,
} from '@/types/forms/volunteer';
import { Button, Box } from '@mui/material';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import useValidation from '@/hooks/useValidation';
import { ValidationErrors } from '@/utils/validation';

export default function EditVolunteerView({
  volunteer,
}: {
  volunteer: VolunteerResponse;
}) {
  const [volunteerData, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<UpsertVolunteerFormData> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const validate = useValidation(zUpsertVolunteerFormData);

  const submitData = async () => {
    // Validate the data
    const validationResult = validate(volunteerData);
    if (validationResult) {
      setValidationErrors(validationResult);
      return;
    }

    // Clear the validation errors
    setValidationErrors(undefined);

    try {
      const res = await fetch(`/api/volunteers/${volunteer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(data.message, 'error');
        return;
      }

      router.push(`/volunteers/${volunteer._id}`);
      router.refresh();
      showSnackbar('Volunteer updated successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to update volunteer', 'error');
      console.error(e);
    }
  };

  return (
    <Box>
      <VolunteerForm
        onChange={setVolunteerData}
        volunteerData={volunteerData}
        currentVolunteer={volunteer}
        errors={validationErrors}
      />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
