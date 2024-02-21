import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import Box from '@mui/material/Box';
import { zVerifiedRole } from '@/types/dataModel/roles';

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
        {volunteer.roleVerifications!.find(
          (roleverification) =>
            roleverification.role === zVerifiedRole.Values.Medical
        ) && <LocalHospitalIcon style={{ color: 'red' }} />}
        {volunteer.roleVerifications!.find(
          (roleverification) =>
            roleverification.role === zVerifiedRole.Values.Dental
        ) && <MasksIcon style={{ color: 'skyblue' }} />}
        {volunteer.roleVerifications!.find(
          (roleverification) =>
            roleverification.role === zVerifiedRole.Values['Save the Babies']
        ) && <ChildFriendlyIcon style={{ color: 'lightgray' }} />}
      </Box>
    </ListItem>
  );
}
