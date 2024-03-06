'use client';
import IconList from '@/components/IconList';
import { Stack, Typography } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import { ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <ListItemButton onClick={() => router.push(`/events/${eventResponse._id}`)}>
      <Stack direction="column">
        <Typography variant="h5">{eventResponse.name}</Typography>
        <Typography variant="body1">
          {/* TODO: there will always be a date here. investigate response type */}
          Date: {eventResponse.date?.toDateString()}
        </Typography>

        <Typography variant="body1">
          Description: {eventResponse.description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <IconList roles={eventResponse.eventRoles}></IconList>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
