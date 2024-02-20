import React from 'react';
import VolunteerListItem from '@/app/components/VolunteerList/VolunteerListItem';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { List } from '@mui/material';

interface VolunteerListProps {
  VolunteerResponses: VolunteerResponse[];
}

export default function VolunteerList({
  VolunteerResponses,
}: VolunteerListProps) {
  return (
    <List>
      {VolunteerResponses.map((volunteer) => (
        <VolunteerListItem key={volunteer._id} volunteer={volunteer} />
      ))}
    </List>
  );
}
