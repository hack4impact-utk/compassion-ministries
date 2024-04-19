import { useMediaQuery, useTheme } from '@mui/material';

interface ResponsiveProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
  tablet?: React.ReactNode;
}

export default function Responsive({
  mobile,
  desktop,
  tablet,
}: ResponsiveProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (isTablet && tablet) {
    return tablet;
  } else if (isTablet || isMobile) {
    return mobile;
  } else {
    return desktop;
  }
}
