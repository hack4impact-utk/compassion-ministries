'use client';
import React, { useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerForm from '@/components/VolunteerForm';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { Button, Box } from '@mui/material';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';

export default function EditVolunteerView({
  volunteer,
}: {
  volunteer: VolunteerResponse;
}) {
  const [volunteerData, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const submitData = async () => {
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
      />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
