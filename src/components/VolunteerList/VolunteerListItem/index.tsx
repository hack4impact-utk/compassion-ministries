'use client';
import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import IconList from '@/components/IconList';

interface VolunteerListItemProps {
  volunteer: VolunteerResponse;
}

/* Displays the volunteer's names, emails, and their role with a colored icon */
export default function VolunteerListItem({
  volunteer,
}: VolunteerListItemProps) {
  const router = useRouter();

  return (
    <ListItemButton
      key={volunteer._id}
      onClick={() => router.push(`/volunteers/${volunteer._id}`)}
    >
      <ListItemText
        primary={`${volunteer.firstName} ${volunteer.lastName}`}
        secondary={volunteer.email}
      />
      <Box>
        <IconList
          roles={volunteer.roleVerifications!.map((verif) => verif.role)}
        ></IconList>
      </Box>
    </ListItemButton>
  );
}
