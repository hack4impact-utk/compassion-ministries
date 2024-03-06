import IconList from '@/components/IconList';
import { EventResponse } from '@/types/dataModel/event';
import { ListItem, Stack, Typography } from '@mui/material';

/*
Returns a ListItem component containing the following info about the provided Event
 - Name
 - Start Date
 - Description
 - Roles
*/
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
          <IconList roles={eventResponse.eventRoles}></IconList>
        </Stack>
      </Stack>
    </ListItem>
  );
}
