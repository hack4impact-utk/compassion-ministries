'use client';
import { UserResponse } from '@/types/dataModel/user';
import UserList from './UserList';
import { Clear } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AdminAutocomplete from './AdminAutocomplete';
import { useState } from 'react';

interface SettingsViewProps {
  users: UserResponse[];
}

export default function SettingsView({ users }: SettingsViewProps) {
  const [newAdmins, setNewAdmins] = useState<UserResponse[]>([]);
  const adminUsers = users.filter((user) => user.isAdmin);
  const normalUsers = users.filter((user) => !user.isAdmin);

  const handleSubmit = () => {
    console.log('submit', newAdmins);
    setNewAdmins([]);
  };

  return (
    <Grid2 container>
      <Grid2 xs={12} sx={{ mb: 3 }}>
        <Typography variant="h3">Settings</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h6">Admins</Typography>
        <UserList
          users={adminUsers}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              size="small"
              onClick={() => console.log('remove admin')}
            >
              <Clear fontSize="small" />
            </IconButton>
          }
        />
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Add admins</Typography>
      </Grid2>
      <Grid2 xs={12} md={6} sx={{ mt: 1 }}>
        <AdminAutocomplete
          value={newAdmins}
          users={normalUsers}
          onChange={setNewAdmins}
        />
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 2 }}>
        {/* TODO: update to loading button when ready */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={newAdmins.length === 0}
        >
          Save
        </Button>
      </Grid2>
    </Grid2>
  );
}
