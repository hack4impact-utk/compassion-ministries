'use client';
import EventList from '@/components/EventList';
import { EventResponse } from '@/types/dataModel/event';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';

interface EventsViewProps {
  events: EventResponse[];
}

export default function EventsView({ events }: EventsViewProps) {
  const search = useSearch();

  if (search.length > 0) {
    events = events.filter((event) =>
      `${event.name}`.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Box>
      <SearchField />
      <Typography variant="h3" sx={{ mb: 2 }}>
        Events
      </Typography>
      <Link href="/events/new">
        <Button variant="contained" fullWidth>
          New event
        </Button>
      </Link>
      <EventList events={events} />
    </Box>
  );
}
