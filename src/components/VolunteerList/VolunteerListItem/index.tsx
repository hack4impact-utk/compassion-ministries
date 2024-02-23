import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import Box from '@mui/material/Box';
import { getRoleIcons, sortRoles } from '@/utils/role';

interface VolunteerListItemProps {
  volunteer: VolunteerResponse;
}

/* Displays the volunteer's names, emails, and their role with a colored icon */
export default function VolunteerListItem({
  volunteer,
}: VolunteerListItemProps) {
  return (
    <ListItem>
      <ListItemText
        primary={`${volunteer.firstName} ${volunteer.lastName}`}
        secondary={volunteer.email}
      />
      <Box>
        {getRoleIcons(
          sortRoles(volunteer.roleVerifications!.map((verif) => verif.role))
        )}
      </Box>
    </ListItem>
  );
}
