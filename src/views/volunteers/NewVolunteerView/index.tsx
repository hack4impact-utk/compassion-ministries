'use client';
import React, { useState } from 'react';
import VolunteerForm from '@/components/VolunteerForm';
import { UpsertVolunteerFormData } from '@/types/forms/volunteer';
import { Button, Box } from '@mui/material';

export default function NewVolunteerView() {
  const [volunteers, setVolunteerData] = useState<UpsertVolunteerFormData>(
    {} as UpsertVolunteerFormData
  );

  const submitData = () => {
    // Placeholder submit function
    // TODO: replace with actual implementation
    console.log('Volunteer data submitted:', volunteers);
  };

  return (
    <Box>
      <VolunteerForm onChange={setVolunteerData} volunteerData={volunteers} />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
