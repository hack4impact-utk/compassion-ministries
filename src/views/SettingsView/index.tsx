'use client';
import { UserResponse } from '@/types/dataModel/user';
import UserList from './UserList';
import { Clear } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AdminAutocomplete from './AdminAutocomplete';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsViewProps {
  users: UserResponse[];
}

export default function SettingsView({ users }: SettingsViewProps) {
  const [newAdmins, setNewAdmins] = useState<UserResponse[]>([]);
  const router = useRouter();
  const adminUsers = users.filter((user) => user.isAdmin);
  const normalUsers = users.filter((user) => !user.isAdmin);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/admins', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmins.map((user) => user._id)),
      });

      if (res.status !== 204) {
        console.error('Failed to add admins');
        return;
      }
      setNewAdmins([]);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      const res = await fetch(`/api/admins/${userId}/remove`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 204) {
        console.error('Failed to remove admin');
        return;
      }
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid2 container>
      <Grid2 xs={12} sx={{ mb: 3 }}>
        <Typography variant="h3">Settings</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h6">Admins</Typography>
        <UserList users={adminUsers} onRemove={handleRemoveAdmin} />
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
