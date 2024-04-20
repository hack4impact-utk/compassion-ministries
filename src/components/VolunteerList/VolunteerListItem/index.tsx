'use client';
import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import RoleIconList from '@/components/RoleIconList';

interface VolunteerListItemProps {
  volunteer: VolunteerResponse;
}

/* Displays the volunteer's names, emails, and their role with a colored icon */
export default function VolunteerListItem({
  volunteer,
}: VolunteerListItemProps) {
  const router = useRouter();
  volunteer.backgroundCheck?.status;
  return (
    <ListItemButton
      key={volunteer._id}
      onClick={() => router.push(`/volunteers/${volunteer._id}`)}
      sx={{ pl: 0, pr: 0 }}
    >
      <ListItemText
        primary={`${volunteer.firstName} ${volunteer.lastName}`}
        secondary={volunteer.email}
        primaryTypographyProps={{ variant: 'h5' }}
        secondaryTypographyProps={{ variant: 'body1' }}
      />
      <Box>
        <RoleIconList
          roles={volunteer.roleVerifications!.map((verif) => verif.role)}
        ></RoleIconList>
      </Box>
    </ListItemButton>
  );
}
