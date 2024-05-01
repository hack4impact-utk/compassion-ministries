'use client';
import React, { useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerForm from '@/components/VolunteerForm';
import {
  UpsertVolunteerFormData,
  zUpsertVolunteerFormData,
} from '@/types/forms/volunteer';
import { Box } from '@mui/material';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import useValidation from '@/hooks/useValidation';
import { ValidationErrors } from '@/utils/validation';
import LoadingButton from '@/components/LoadingButton';

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

  const [isLoading, setIsLoading] = useState(false);
  const submitData = async () => {
    // Validate the data
    // remove the formatting from the phone number from the volunteer
    volunteerData.phoneNumber = volunteerData.phoneNumber.replace(/\D/g, '');

    const validationResult = validate(volunteerData);
    if (validationResult) {
      setValidationErrors(validationResult);
      return;
    }

    // Clear the validation errors
    setValidationErrors(undefined);

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      <LoadingButton
        loading={isLoading}
        variant="contained"
        fullWidth
        type="submit"
        onClick={submitData}
      >
        Submit
      </LoadingButton>
    </Box>
  );
}
