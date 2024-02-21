import { EventResponse } from '@/types/dataModel/event';
import { getRoleIcons, sortRoles } from '@/utils/role';
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
          {getRoleIcons(sortRoles(eventResponse.eventRoles))}
        </Stack>
      </Stack>
    </ListItem>
  );
}
