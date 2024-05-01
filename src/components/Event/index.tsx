'use client';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import RoleIconList from '../RoleIconList';
import EventVolunteerList from '../EventVolunteerList';
import EmailList from '../EmailList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailEditor from '../EmailEditor';

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

  const [showEmail, setShowEmail] = useState(false);

  const handleClick = () => {
    setShowEmail(true);
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

      {event.emails && event.emails.length > 0 ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Previously sent emails ({event.emails.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmailList emails={event.emails} />
          </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion disabled>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>No previously sent emails</Typography>
          </AccordionSummary>
        </Accordion>
      )}
      <Button
        variant="contained"
        fullWidth
        onClick={handleClick}
        sx={{ my: 2 }}
      >
        New Email
      </Button>
      {showEmail && <EmailEditor event={event} volunteers={eventVolunteers} />}

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
