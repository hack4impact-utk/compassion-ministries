'use client';
import IconList from '@/components/IconList';
import { Stack, Typography } from '@mui/material';
import { EventResponse } from '@/types/dataModel/event';
import { ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getEventDisplayDate } from '@/utils/dates';

/*
Returns a ListItem component containing the following info about the provided Event
 - Name
 - Start Date
 - Description
 - Roles
*/
export default function EventListItem({ event }: { event: EventResponse }) {
  const router = useRouter();
  return (
    <ListItemButton onClick={() => router.push(`/events/${event._id}`)}>
      <Stack direction="column" width="100%">
        <Typography variant="h5">{event.name}</Typography>
        <Typography variant="body1" color="#808080">
          {getEventDisplayDate(event)}
        </Typography>

        {event.description && (
          <Typography variant="body1" pt={1}>
            {event.description}
          </Typography>
        )}
        <Stack direction="row" justifyContent="flex-end">
          <IconList roles={event.eventRoles}></IconList>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
