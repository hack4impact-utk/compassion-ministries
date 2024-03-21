'use client';
import EventForm from '@/components/EventForm';
import useSnackbar from '@/hooks/useSnackbar';
import { CreateEventRequest } from '@/types/dataModel/event';
import { EventFormData } from '@/types/forms/events';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewEventView() {
  const [formData, setFormData] = useState<EventFormData>({} as EventFormData);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const submitHandler = async () => {
    const reqBody: CreateEventRequest = {
      name: formData.name,
      description: formData.description,
      eventLocation: formData.eventLocation,
      startAt: new Date(formData.startAt.toString()),
      endAt: new Date(formData.endAt.toString()),
      date: new Date(formData.date.toString()),
      eventRoles: formData.eventRoles,
      isRecurring: false,
    };
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();

      if (res.status !== 201) {
        showSnackbar(data.message, 'error');
        return;
      }

      router.push(`/events/${data.id}`);
      router.refresh();
      showSnackbar('Event created successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to create event', 'error');
      console.error(e);
    }
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
