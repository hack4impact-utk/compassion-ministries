'use client';
import Event from '@/components/Event';
import EmailEditor from '@/components/EmailEditor';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

export default function EventView({
  event,
  eventVolunteers,
}: {
  event: EventResponse;
  eventVolunteers: EventVolunteerResponse[];
}) {
  const [showEmail, setShowEmail] = useState(false);

  const handleClick = () => {
    setShowEmail(true);
  };
  return (
    <Box>
      {/* TODO: Add back in after demo/implementation */}
      {/* <Button variant="contained">Edit</Button> */}
      <Link href={`/events/${event._id}/check-in`}>
        <Button variant="contained" fullWidth sx={{ mb: 2 }}>
          Check-in
        </Button>
      </Link>
      <Button variant="contained" fullWidth onClick={handleClick}>
        New Email
      </Button>
      <Event event={event} eventVolunteers={eventVolunteers} />
      {showEmail && <EmailEditor event={event} volunteers={eventVolunteers} />}
    </Box>
  );
}
