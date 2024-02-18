import { EventResponse } from '@/types/dataModel/event';
import { roleIcons } from '@/utils/icons';
import { ListItem, Stack, SvgIcon, Typography } from '@mui/material';

export default function EventListItem({
  eventResponse,
}: {
  eventResponse: EventResponse;
}) {
  return (
    <ListItem>
      <Stack direction="column">
        <SvgIcon></SvgIcon>
        <Typography variant="h5">{eventResponse.name}</Typography>
        <Typography variant="body1">
          Date: {eventResponse.startAt.toDateString()}
        </Typography>
        <Typography variant="body1">
          Description: {eventResponse.description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          {eventResponse.eventRoles.map((eventRole) => roleIcons[eventRole])}
        </Stack>
      </Stack>
    </ListItem>
  );
}
