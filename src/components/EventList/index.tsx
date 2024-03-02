import { List } from '@mui/material';
import EventListItem from './EventListItem';
import { EventResponse } from '@/types/dataModel/event';

// Returns a List containing an EventListItem for each provided Event
export default function EventList({ events }: { events: EventResponse[] }) {
  return (
    <List>
      {events.map((eventResponse) => (
        <EventListItem eventResponse={eventResponse} key={eventResponse._id} />
      ))}
    </List>
  );
}
