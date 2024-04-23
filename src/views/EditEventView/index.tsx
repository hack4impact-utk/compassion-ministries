'use client';
import React, { useState } from 'react';
import { EventResponse } from '@/types/dataModel/event';
import {
  UpsertEventFormData,
  zUpsertEventFormData,
} from '@/types/forms/events';
import { ValidationErrors } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import useValidation from '@/hooks/useValidation';
import useSnackbar from '@/hooks/useSnackbar';
import EventForm from '@/components/EventForm';
import { Box, Button } from '@mui/material';

export default function EditEventView({ event }: { event: EventResponse }) {
  const [eventData, setEventData] = useState<UpsertEventFormData>(
    {} as UpsertEventFormData
  );
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<UpsertEventFormData> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const validate = useValidation(zUpsertEventFormData);

  const submitData = async () => {
    // Validate the data

    const validationResult = validate(eventData);
    if (validationResult) {
      setValidationErrors(validationResult);
      return;
    }

    // Clear the validation errors
    setValidationErrors(undefined);

    // NOTE: Actual submitting does not work yet, waiting on a dependancc
    try {
      const res = await fetch(`/api/events/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(data.message, 'error');
        return;
      }

      router.push(`/events/${event._id}`);
      router.refresh();
      showSnackbar('Event updated successfully', 'success');
    } catch (error) {
      showSnackbar('Error updating event', 'error');
      console.error(error);
    }
  };

  return (
    <Box>
      <EventForm
        onChange={setEventData}
        eventData={eventData}
        currentEvent={event}
        errors={validationErrors}
      />
      <Button variant="contained" fullWidth type="submit" onClick={submitData}>
        Submit
      </Button>
    </Box>
  );
}
