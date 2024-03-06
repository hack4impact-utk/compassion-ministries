import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getRoleIcons } from '@/utils/role';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import Box from '@mui/material/Box';
import { ForkLeft } from '@mui/icons-material';

// Prop Array with Objects
interface EventVolunteerListProps {
  volunteerResponses: EventVolunteerResponse[];
}

export default function EventVolunteerList({
  volunteerResponses,
}: EventVolunteerListProps): React.ReactElement {
  return (
    <List>
      {volunteerResponses.map((eventVolunteer, index) => (
        <ListItem key={index}>
          {/* Show Volunteer information */}
          <ListItemText
            primary={`${eventVolunteer.volunteer.firstName} ${eventVolunteer.volunteer.lastName}`}
            secondary={`With ${eventVolunteer.volunteer.previousOrganization}`}
          />
          {/* Display Icons of the Volunteer's Role */}
          <Box sx={{ display: 'flex' }} pt={1} key={index}>
            {/* Render valid React elements here */}
            {getRoleIcons([eventVolunteer.role])}
            {eventVolunteer.role}
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
