'use client';
import Event from '@/components/Event';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Box, Button } from '@mui/material';

export default function EventView({
  event,
  eventVolunteers,
}: {
  event: EventResponse;
  eventVolunteers: EventVolunteerResponse[];
}) {
  return (
    <Box>
      <Event event={event} eventVolunteers={eventVolunteers} />
      <Button variant="contained">Edit</Button>
      <Button variant="contained">Check-in</Button>
    </Box>
  );
}
