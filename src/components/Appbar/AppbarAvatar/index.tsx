import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import pkg from '~/package.json';

const { version } = pkg;

export default function AppbarAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: session } = useSession();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const settings = [
    {
      id: 'sign-out',
      text: 'Sign out',
      onClick: () => {
        signOut();
        handleCloseUserMenu();
      },
    },
  ];

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {/* TODO: update this src with session info */}
        <Avatar src={session?.user.image || ''} />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        {settings
          .map((setting) => (
            <MenuItem key={setting.id} onClick={setting.onClick}>
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
          ))
          .concat([
            <Divider key="divider" />,
            <MenuItem
              key="version"
              disabled
              sx={{
                '&.Mui-disabled': {
                  opacity: 1,
                },
              }}
            >
              <Typography color="text.secondary">v{version}</Typography>
            </MenuItem>,
          ])}
      </Menu>
    </>
  );
}
