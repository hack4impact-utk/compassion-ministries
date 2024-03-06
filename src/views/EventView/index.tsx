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
      <Event event={event} eventVolunteers={eventVolunteers} />
      {/* TODO: Add back in after demo/implementation */}
      {/* <Button variant="contained">Edit</Button> */}
      <Link href={`/events/${event._id}/check-in`}>
        <Button variant="contained">Check-in</Button>
      </Link>
    </Box>
  );
}
