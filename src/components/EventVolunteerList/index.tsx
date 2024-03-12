import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import Box from '@mui/material/Box';
import IconList from '../IconList';

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
        <ListItem
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Show Volunteer information */}
          <ListItemText
            primary={`${eventVolunteer.volunteer.firstName} ${eventVolunteer.volunteer.lastName}`}
            secondary={`With ${eventVolunteer.organization}`}
          />
          {/* Display Icons of the Volunteer's Role */}
          <Box sx={{ display: 'flex' }}>
            <IconList roles={[eventVolunteer.role]} />
            <span>{eventVolunteer.role}</span>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
