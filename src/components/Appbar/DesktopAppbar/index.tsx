import { AppBar, Box, Toolbar } from '@mui/material';
import AppbarAvatar from '../AppbarAvatar';

interface DesktopAppbarProps {
  children?: React.ReactNode;
}

export default function DesktopAppbar({ children }: DesktopAppbarProps) {
  return (
    <AppBar
      position="relative"
      variant="outlined"
      elevation={0}
      sx={{ background: 'white', px: 2 }}
    >
      <Toolbar disableGutters sx={{ paddingLeft: '280px' }}>
        {/* keeps the sign in user circle in the right most corner */}
        <Box sx={{ flexGrow: 1, display: 'flex' }}>{children}</Box>

        <Box sx={{ flexGrow: 0 }}>
          <AppbarAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
