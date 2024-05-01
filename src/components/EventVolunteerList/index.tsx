import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import RoleIconList from '../RoleIconList';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';
import { Box, ListItemButton, Typography, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

// Prop Array with Objects
interface EventVolunteerListProps {
  eventVolunteers: EventVolunteerResponse[];
}

export default function EventVolunteerList({
  eventVolunteers,
}: EventVolunteerListProps): React.ReactElement {
  const search = useSearch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVolunteer, setSelectedVolunteer] =
    useState<EventVolunteerResponse | null>(null);

  if (search.length > 0) {
    eventVolunteers = eventVolunteers.filter((res) =>
      `${res.volunteer.firstName} ${res.volunteer.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  const handleVolunteerClick = (
    volunteer: EventVolunteerResponse,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedVolunteer(volunteer);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewVolunteer = () => {
    if (selectedVolunteer) {
      router.push(`/volunteers/${selectedVolunteer.volunteer._id}`);
    }
    handleMenuClose();
  };

  const handleEditVolunteerCheckIn = () => {
    if (selectedVolunteer) {
      router.push(`/events/check-in/${selectedVolunteer.volunteer._id}/edit`);
    }
    handleMenuClose();
  };

  return (
    <Box>
      <SearchField />
      <List>
        {/* Sort volunteers by last name */}
        {eventVolunteers.length ? (
          eventVolunteers
            .sort((a, b) =>
              `${a.volunteer.lastName} ${a.volunteer.firstName}`.localeCompare(
                `${b.volunteer.lastName} ${b.volunteer.firstName}`
              )
            )
            .map((ev) => (
              <ListItemButton
                key={ev._id}
                onClick={(event) => handleVolunteerClick(ev, event)}
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
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewVolunteer}>View Volunteer</MenuItem>
        <MenuItem onClick={handleEditVolunteerCheckIn}>
          Edit Volunteer Check In
        </MenuItem>
      </Menu>
    </Box>
  );
}
