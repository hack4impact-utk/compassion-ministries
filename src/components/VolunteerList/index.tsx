import React from 'react';
import VolunteerListItem from '@/components/VolunteerList/VolunteerListItem';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { List } from '@mui/material';
import { sortByLastName } from '@/utils/sorting';

interface VolunteerListProps {
  volunteers: VolunteerResponse[];
}

export default function VolunteerList({ volunteers }: VolunteerListProps) {
  return (
    <List>
      {/* Sorts volunteerse by last name */}
      {sortByLastName<VolunteerResponse>(
        volunteers,
        'firstName',
        'lastName'
      ).map((volunteer) => (
        <VolunteerListItem key={volunteer._id} volunteer={volunteer} />
      ))}
    </List>
  );
}
