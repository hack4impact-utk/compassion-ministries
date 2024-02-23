import VolunteerList from '@/components/VolunteerList';
import { EventResponse } from '@/types/dataModel/event';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface EventProps {
  event: EventResponse;
  volunteers: VolunteerResponse[];
}

export default function Event({
  event,
  volunteers,
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
      <Typography variant="h5">{event.eventLocation}</Typography>
      {event.date && (
        <Typography variant="h5">{formatDate(event.date)}</Typography>
      )}
      <Typography variant="h5">
        {formatTime(event.startAt)} - {formatTime(event.endAt)}
      </Typography>
      <Typography variant="h5">
        {Array.isArray(event.eventRoles)
          ? event.eventRoles.join(', ')
          : event.eventRoles}
      </Typography>
      <h4 style={{ textDecoration: 'underline' }}>Volunteers</h4>
      <VolunteerList volunteerResponses={volunteers} />
    </Box>
  );
}