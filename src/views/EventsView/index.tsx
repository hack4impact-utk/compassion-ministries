import EventList from '@/components/EventList';
import { EventResponse } from '@/types/dataModel/event';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

interface EventsViewProps {
  events: EventResponse[];
}

export default function EventsView({ events }: EventsViewProps) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
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
