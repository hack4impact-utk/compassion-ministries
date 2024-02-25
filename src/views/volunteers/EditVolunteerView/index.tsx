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
  const submitData = () => {
    // Placeholder submit function
    // TODO: replace with actual implementation
    console.log('Volunteer data submitted:', volunteerData);
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
