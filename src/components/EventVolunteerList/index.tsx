import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getRoleIcons } from '@/utils/role';

// Object with name, role, and organization
interface EventVolunteerResponse {
  volunteer: {
    name: string;
    role: string;
    organization: string;
  };
}

// Prop Array with Objects
interface EventVolunteerListProps {
  volunteerResponses: EventVolunteerResponse[];
}

const EventVolunteerList: React.FC<EventVolunteerListProps> = ({
  volunteerResponses,
}) => {
  return (
    <List>
      {volunteerResponses.map((eventVolunteer, index) => (
        <ListItem key={index}>
          {/* Display Icons of the Volunteer's Role */}
          <ListItemAvatar>
            <Avatar>{getRoleIcons([eventVolunteer.volunteer.role])}</Avatar>
          </ListItemAvatar>
          {/* Show Volunteer information */}
          <ListItemText
            primary={eventVolunteer.volunteer.name}
            secondary={`${eventVolunteer.volunteer.role} at ${eventVolunteer.volunteer.organization}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default EventVolunteerList;
