import { ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

interface VolunteerListItemProps {
  volunteer: VolunteerResponse;
}

export default function VolunteerListItem({
  volunteer,
}: VolunteerListItemProps) {
  // display the volunteer's firstName + lastName, email located direct under the name, and role verification
  return (
    <>
      <h1>VolunteerListItem</h1>
      <ListItem>
        <ListItemText
          primary={
            <Typography variant="body1">
              Name: {`${volunteer.firstName} ${volunteer.lastName}`}
            </Typography>
          }
          secondary={<Typography variant="body2"> Email: {volunteer.email}</Typography>}
        />
      </ListItem>
    </>
  );
}
