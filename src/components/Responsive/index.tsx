import useResponsive from '@/hooks/useResponsive';

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
  const { isMobile, isTablet } = useResponsive();

  if (isTablet && tablet) {
    return tablet;
  } else if (isTablet || isMobile) {
    return mobile;
  } else {
    return desktop;
  }
}
