import { AppBar, Box, Toolbar } from '@mui/material';
import AppbarAvatar from '../AppbarAvatar';

export default function DesktopAppbar() {
  return (
    <AppBar
      position="relative"
      variant="outlined"
      elevation={0}
      sx={{ background: 'white', px: 2 }}
    >
      <Toolbar disableGutters>
        {/* keeps the sign in user circle in the right most corner */}
        <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>

        <Box sx={{ flexGrow: 0 }}>
          <AppbarAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
