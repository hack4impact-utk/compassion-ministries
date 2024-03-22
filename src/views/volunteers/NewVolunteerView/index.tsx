'use client';
import React, { useState } from 'react';
import VolunteerForm from '@/components/VolunteerForm';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { Button, Box, Typography } from '@mui/material';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';

export default function NewVolunteerView() {
  const [volunteer, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const submitData = async () => {
    try {
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
  };

  return (
    <Box>
      <Typography variant="h4">New Volunteer</Typography>
      <VolunteerForm onChange={setVolunteerData} volunteerData={volunteer} />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
