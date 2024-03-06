import React from 'react';
import VolunteerListItem from '@/components/VolunteerList/VolunteerListItem';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { List } from '@mui/material';

interface VolunteerListProps {
  volunteers: VolunteerResponse[];
}

export default function VolunteerList({ volunteers }: VolunteerListProps) {
  return (
    <List>
      {volunteers.map((volunteer) => (
        <VolunteerListItem key={volunteer._id} volunteer={volunteer} />
      ))}
    </List>
  );
}
