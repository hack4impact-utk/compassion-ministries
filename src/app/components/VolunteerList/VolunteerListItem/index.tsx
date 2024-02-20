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
      <ListItem>
        <ListItemText
          primary={
            <Typography variant="body1">
              {`${volunteer.firstName} ${volunteer.lastName}`}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body2"> {volunteer.email}</Typography>
              {volunteer.roleVerifications &&
                volunteer.roleVerifications[0] && (
                  <Typography variant="body2" sx={{ textAlign: 'left' }}>
                    {' '}
                    {volunteer.roleVerifications[0].role}
                  </Typography>
                )}
            </>
          }
        />
      </ListItem>
    </>
  );
}
