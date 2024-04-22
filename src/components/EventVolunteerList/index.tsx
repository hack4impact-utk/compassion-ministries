import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import RoleIconList from '../RoleIconList';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';
import { Box, ListItemButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// Prop Array with Objects
interface EventVolunteerListProps {
  eventVolunteers: EventVolunteerResponse[];
}

export default function EventVolunteerList({
  eventVolunteers: eventVolunteers,
}: EventVolunteerListProps): React.ReactElement {
  const search = useSearch();
  const router = useRouter();

  if (search.length > 0) {
    eventVolunteers = eventVolunteers.filter((res) =>
      `${res.volunteer.firstName} ${res.volunteer.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return (
    <Box>
      <SearchField />
      <List>
        {eventVolunteers.length ? (
          eventVolunteers.map((ev) => (
            <ListItemButton
              key={ev._id}
              onClick={() => router.push(`/volunteers/${ev.volunteer._id}`)}
              sx={{ pl: 0 }}
            >
              {/** Displays bullet and org name only if org is present */}
              <ListItemText
                primary={`${ev.volunteer.firstName} ${ev.volunteer.lastName}`}
                secondary={`${ev.volunteer.email} ${
                  ev.organization ? '• ' + ev.organization.name : ''
                }`}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <Box>
                <RoleIconList roles={[ev.role]}></RoleIconList>
              </Box>
            </ListItemButton>
          ))
        ) : (
          <Typography variant="h5" pt={2}>
            No volunteers!
          </Typography>
        )}
      </List>
    </Box>
  );
}
