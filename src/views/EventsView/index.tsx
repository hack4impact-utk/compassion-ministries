import EventList from '@/components/EventList';
import { EventResponse } from '@/types/dataModel/event';
import { Box } from '@mui/material';

interface EventsViewProps {
  events: EventResponse[];
}

export default function EventsView({ events }: EventsViewProps) {
  return (
    <Box>
      <EventList events={events} />
    </Box>
  );
}
