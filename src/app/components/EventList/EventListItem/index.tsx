import { EventResponse } from '@/types/dataModel/event';
import { ListItem, Stack, Typography } from '@mui/material';

export default function EventListItem({
  eventResponse,
}: {
  eventResponse: EventResponse;
}) {
  return (
    <ListItem>
      <Stack direction="column">
        <Typography variant="h5">{eventResponse.name}</Typography>
        <Typography variant="body1">
          Date: {eventResponse.startAt.toDateString()}
        </Typography>
        <Typography variant="body1">
          Description: {eventResponse.description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          {eventResponse.eventRoles.map((eventRole) => (
            <Typography variant="body2" key={eventRole}>
              {eventRole}
            </Typography>
          ))}
        </Stack>
      </Stack>
      {/* <ListItemText primary={eventResponse.name} />
      <ListItemText primary={eventResponse.startAt.toDateString()} />
      <ListItemText primary={eventResponse.description} />
      {eventResponse.eventRoles.map((eventRole) => (
        <ListItemText primary={eventRole} key={eventRole} />
      ))} */}
    </ListItem>
  );
}
