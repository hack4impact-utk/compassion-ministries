'use client';
import { ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import RoleIconList from '@/components/RoleIconList';
import BGCIcon from '@/components/BGCIcon';

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
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
            {volunteer.backgroundCheck?.status && (
              <BGCIcon
                status={volunteer.backgroundCheck?.status}
                size="large"
              />
            )}
          </Box>
        }
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
