import { List } from '@mui/material';
import EventListItem from './EventListItem';
import { EventResponse } from '@/types/dataModel/event';

export default function EventList({
  eventResponses,
}: {
  eventResponses: EventResponse[];
}) {
  return (
    <List>
      {eventResponses.map((eventResponse) => (
        <EventListItem eventResponse={eventResponse} key={eventResponse._id} />
      ))}
    </List>
  );
}
