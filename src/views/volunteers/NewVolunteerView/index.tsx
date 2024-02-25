'use client';
import React, { useState } from 'react';
import VolunteerForm from '@/components/VolunteerForm';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { Button, Box } from '@mui/material';

export default function NewVolunteerView() {
  const [volunteer, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );

  const submitData = async () => {
    const res = await fetch('/api/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteer),
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.error(
        'failed to create volunteer. volunteer: ',
        volunteer,
        'response: ',
        data
      );
    }
  };

  return (
    <Box>
      <VolunteerForm onChange={setVolunteerData} volunteerData={volunteer} />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
