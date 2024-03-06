'use client';
import React, { useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import VolunteerForm from '@/components/VolunteerForm';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { Button, Box } from '@mui/material';

export default function EditVolunteerView({
  volunteer,
}: {
  volunteer: VolunteerResponse;
}) {
  const [volunteerData, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );
  const submitData = async () => {
    const res = await fetch(`/api/volunteers/${volunteer._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    });

    if (res.status !== 204) {
      console.error('failed to create volunteer. volunteer: ', volunteerData);
      return;
    }

    window.location.href = `/volunteers/${volunteer._id}`;
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
