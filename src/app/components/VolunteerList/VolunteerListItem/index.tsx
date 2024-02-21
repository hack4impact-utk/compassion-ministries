import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

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
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {volunteer.roleVerifications &&
          volunteer.roleVerifications.map((roleVerification, index) => {
            if (roleVerification.role === 'Medical') {
              return (
                <LocalHospitalIcon
                  key={`medical-${index}`}
                  style={{ color: 'red' }}
                />
              );
            } else if (roleVerification.role === 'Dental') {
              return (
                <MasksIcon
                  key={`dental-${index}`}
                  style={{ color: 'skyblue' }}
                />
              );
            } else if (roleVerification.role === 'Save the Babies') {
              return (
                <ChildFriendlyIcon
                  key={`babies-${index}`}
                  style={{ color: 'lightgray' }}
                />
              );
            } else {
              return null;
            }
          })}
      </div>
    </ListItem>
  );
}
