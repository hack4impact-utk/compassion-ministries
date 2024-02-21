import { EventResponse } from '@/types/dataModel/event';
import { roleIcons } from '@/utils/icons';
import { ListItem, Stack, Typography } from '@mui/material';
import { roles } from '@/types/dataModel/roles';

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
          {roles.map(
            (role) => eventResponse.eventRoles.includes(role) && roleIcons[role]
          )}
        </Stack>
      </Stack>
    </ListItem>
  );
}
