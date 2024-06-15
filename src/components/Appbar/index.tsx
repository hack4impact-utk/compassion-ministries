'use client';
import Responsive from '../Responsive';
import DesktopAppbar from './DesktopAppbar';
import MobileAppbar from './MobileAppbar';

interface AppbarProps {
  setDrawerOpen: () => void;
  children?: React.ReactNode;
}

export default function Appbar({ setDrawerOpen, children }: AppbarProps) {
  return (
    <Responsive
      mobile={
        <MobileAppbar setDrawerOpen={setDrawerOpen}>{children}</MobileAppbar>
      }
      desktop={<DesktopAppbar>{children}</DesktopAppbar>}
    />
  );
}
