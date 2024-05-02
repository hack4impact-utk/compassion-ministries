import { AppBar, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import AppbarAvatar from '../AppbarAvatar';
import { Menu } from '@mui/icons-material';

interface MobileAppbarProps {
  setDrawerOpen: () => void;
  children?: React.ReactNode;
}

export default function HeaderAppBar({
  setDrawerOpen,
  children,
}: MobileAppbarProps) {
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="fixed"
        variant="outlined"
        elevation={0}
        sx={{ background: 'white', px: 2 }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            <IconButton
              size="large"
              aria-label="navigation drawer toggle open"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpen()}
              sx={{ color: theme.palette.grey['800'] }}
            >
              <Menu />
            </IconButton>
            {children}
          </Box>
          {/* keeps the sign in user circle in the right most corner */}

          <AppbarAvatar />
        </Toolbar>
      </AppBar>
      {/* gross hack but this is pretty much the recommended way to do this */}
      <Toolbar />
    </>
  );
}
