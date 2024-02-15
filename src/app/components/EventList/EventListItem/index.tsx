import { EventResponse } from '@/types/dataModel/event';
import { ListItem, ListItemText } from '@mui/material';

export default function EventListItem({
  eventResponse,
}: {
  eventResponse: EventResponse;
}) {
  return (
    <ListItem>
      <ListItemText primary={eventResponse.name} />
      <ListItemText primary={eventResponse.startAt.toDateString()} />
      <ListItemText primary={eventResponse.description} />
      {eventResponse.eventRoles.map((eventRole) => (
        <ListItemText primary={eventRole} key={eventRole} />
      ))}
    </ListItem>
  );
}
