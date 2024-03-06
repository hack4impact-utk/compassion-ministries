'use client';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { Box, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import IconList from '../IconList';
import { useRouter } from 'next/navigation';

interface EventProps {
  event: EventResponse;
  eventVolunteers: EventVolunteerResponse[];
}

export default function Event({
  event,
  eventVolunteers,
}: EventProps): React.ReactElement {
  const router = useRouter();
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
      <Typography variant="h5">{event.eventLocation}</Typography>
      {event.date && (
        <Typography variant="h5">{formatDate(new Date(event.date))}</Typography>
      )}
      <Typography variant="h5">
        {formatTime(new Date(event.startAt))} -{' '}
        {formatTime(new Date(event.endAt))}
      </Typography>
      <Typography variant="h5">
        {Array.isArray(event.eventRoles)
          ? event.eventRoles.join(', ')
          : event.eventRoles}
      </Typography>
      <h4 style={{ textDecoration: 'underline' }}>Volunteers</h4>
      {/* TODO remove the below and replace with EventVolounteerList component */}

      {eventVolunteers.map((ev) => (
        <ListItemButton
          key={ev._id}
          onClick={() => router.push(`/volunteers/${ev.volunteer._id}`)}
        >
          <ListItemText
            primary={`${ev.volunteer.firstName} ${ev.volunteer.lastName}`}
            secondary={ev.volunteer.email}
          />
          <Box>
            <IconList roles={[ev.role]}></IconList>
          </Box>
        </ListItemButton>
      ))}
    </Box>
  );
}
