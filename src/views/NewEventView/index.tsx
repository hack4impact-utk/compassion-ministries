'use client';
import EventForm from '@/components/EventForm';
import { EventFormData } from '@/types/forms/events';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

export default function NewEventView() {
  const [formData, setFormData] = useState<EventFormData>({} as EventFormData);
  const submitHandler = () => {
    console.log(formData);
  };
  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">New event</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <EventForm eventData={formData} onChange={setFormData} />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
}
