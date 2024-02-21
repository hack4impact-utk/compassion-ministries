import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MasksIcon from '@mui/icons-material/Masks';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

interface VolunteerListItemProps {
  volunteer: VolunteerResponse;
}

export default function VolunteerListItem({
  volunteer,
}: VolunteerListItemProps) {
  // display the volunteer's firstName + lastName, email located direct under the name, and role verification
  return (
    <ListItem>
      <ListItemText
        primary={`${volunteer.firstName} ${volunteer.lastName}`}
        secondary={volunteer.email}
      />
      {/* display the local hospital icon if the volunteer has a medical role verification, the masks icon if the volunteer has a Dental role verification, and the child friendly icon if the volunteer has a Save the Babies role verification. the icons also should be top right aligned*/}
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
