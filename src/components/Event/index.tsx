'use client';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Box, Typography } from '@mui/material';
import React from 'react';
import RoleIconList from '../RoleIconList';
import EventVolunteerList from '../EventVolunteerList';

interface EventProps {
  event: EventResponse;
  eventVolunteers: EventVolunteerResponse[];
}

export default function Event({
  event,
  eventVolunteers,
}: EventProps): React.ReactElement {
  // Format the date to a localized string
  const formatDate = (date: Date): string => {
    const option: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, option);
  };

  // Format the time to a localized string
  const formatTime = (date: Date): string => {
    const option = {
      hour: 'numeric' as const,
      minute: 'numeric' as const,
    };
    return date.toLocaleTimeString(undefined, option);
  };

  return (
    <Box>
      {/* Display the event name with different font size based on its length */}
      <Typography variant={'h4'}>{event.name}</Typography>
      {event.description && (
        <Typography variant="body1">{event.description}</Typography>
      )}
      <Typography variant="body1" pt={2}>
        {event.eventLocation}
      </Typography>
      {event.date && (
        <Typography variant="body1" pt={2}>
          {formatDate(new Date(event.date))}
        </Typography>
      )}
      <Typography variant="body1" pb={2}>
        {formatTime(new Date(event.startAt))} -{' '}
        {formatTime(new Date(event.endAt))}
      </Typography>
      <RoleIconList roles={event.eventRoles} />
      <Typography
        sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
        variant="h6"
        pt={2}
      >
        Volunteers
      </Typography>
      <EventVolunteerList eventVolunteers={eventVolunteers} />
    </Box>
  );
}
