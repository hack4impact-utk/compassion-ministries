import React from 'react';
import VolunteerListItem from '@/components/VolunteerList/VolunteerListItem';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { List } from '@mui/material';

interface VolunteerListProps {
  volunteerResponses: VolunteerResponse[];
}

export default function VolunteerList({
  volunteerResponses,
}: VolunteerListProps) {
  return (
    <List>
      {volunteerResponses.map((volunteer) => (
        <VolunteerListItem key={volunteer._id} volunteer={volunteer} />
      ))}
    </List>
  );
}
