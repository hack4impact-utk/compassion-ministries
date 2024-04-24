'use client';
import React, {useState} from 'react';
import { Box, Button, Link, Tab, Tabs, Typography } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import dayjs from 'dayjs';
import EventList from '@/components/EventList';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';

interface EventsViewProps {
  events: EventResponse[]
}

const sortEventsByDateAsc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
  });
};

const sortEventsByDateDesc = (events: EventResponse[]) => {
  return events.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
};

export default function EventsPage({events}: EventsViewProps) {
    const search = useSearch();

    if (search.length > 0) {
      events = events.filter((event) =>
        `${event.name}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    let upcomingEvents: EventResponse[];
    let pastEvents: EventResponse[];

    const today = dayjs().startOf('day').toDate();
    const eventsBeforeToday = events.filter(event => dayjs(event.date).isBefore(today));
    const eventsTodayAndAfter = events.filter(event => dayjs(event.date).isSame(today, 'day') || dayjs(event.date).isAfter(today));
        
    upcomingEvents = sortEventsByDateAsc(eventsTodayAndAfter);
    pastEvents = sortEventsByDateDesc(eventsBeforeToday);

    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    };

    return (
      <>
      <Box>
      <SearchField />
      <Typography variant="h3" sx={{ my: 2 }}>
        Events
      </Typography>
      <Link href="/events/new">
        <Button variant="contained" fullWidth>
          New event
        </Button>
      </Link>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Upcoming Events" />
          <Tab label="Past Events" />
        </Tabs>
        {tabIndex === 0 && (
          <EventList events={upcomingEvents} />
        )}
        {tabIndex === 1 && (
          <EventList events={pastEvents} />
        )}
    </Box>
      </>
    );
  }
