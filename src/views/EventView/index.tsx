'use client';
import Event from '@/components/Event';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function EventView({
  event,
  eventVolunteers,
}: {
  event: EventResponse;
  eventVolunteers: EventVolunteerResponse[];
}) {
  return (
    <Box>
      {/* TODO: Add back in after demo/implementation */}
      {/* <Button variant="contained">Edit</Button> */}
      <Link href={`/events/${event._id}/check-in`}>
        <Button variant="contained" fullWidth sx={{ mb: 2 }}>
          Check-in
        </Button>
      </Link>
      <Event event={event} eventVolunteers={eventVolunteers} />
    </Box>
  );
}
