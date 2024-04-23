import { useMediaQuery, useTheme } from '@mui/material';

export default function useResponsive() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md')) && !isMobile;
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return { isMobile, isTablet, isDesktop };
}
