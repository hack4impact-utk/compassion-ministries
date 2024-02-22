import VolunteerList from '@/app/components/VolunteerList';
import { EventResponse } from '@/types/dataModel/event';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { DateTimeFormatOptions } from 'intl';

interface EventProps {
  event: EventResponse;
  volunteers: VolunteerResponse[];
}

export default function EventComponent({
  event,
  volunteers,
}: EventProps): React.ReactElement {
  const eventNameLength = event.name.length;
  const eventNameFontSize = eventNameLength > 20 ? 'h4' : 'h3';

  const formatDate = (date: Date): string => {
    const option: DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, option);
  };

  const formatTime = (date: Date): string => {
    const option = {
      hour: 'numeric' as const,
      minute: 'numeric' as const,
    };
    return date.toLocaleTimeString(undefined, option);
  };

  const formatEndTime = (date: Date): string => {
    const option = {
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      timeZoneName: 'short' as const,
    };
    return date.toLocaleTimeString(undefined, option);
  };

  return (
    <Box>
      <Typography variant={eventNameFontSize}>{event.name}</Typography>
      {event.description && (
        <Typography variant="body1">{event.description}</Typography>
      )}
      <Typography variant="h5">{event.eventLocation}</Typography>
      {event.date && (
        <Typography variant="h5">{formatDate(event.date)}</Typography>
      )}
      <Typography variant="h5">
        {formatTime(event.startAt)} - {formatEndTime(event.endAt)}
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
