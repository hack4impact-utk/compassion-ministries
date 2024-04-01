import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import IconList from '../IconList';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';
import { Box } from '@mui/material';

// Prop Array with Objects
interface EventVolunteerListProps {
  volunteerResponses: EventVolunteerResponse[];
}

export default function EventVolunteerList({
  volunteerResponses,
}: EventVolunteerListProps): React.ReactElement {
  const search = useSearch();

  if (search.length > 0) {
    volunteerResponses = volunteerResponses.filter((res) =>
      `${res.volunteer.firstName} ${res.volunteer.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return (
    <Box>
      <SearchField />
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
            <IconList roles={[eventVolunteer.role]} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
