'use client';
import Responsive from '../Responsive';
import DesktopAppbar from './DesktopAppbar';
import MobileAppbar from './MobileAppbar';

interface AppbarProps {
  setDrawerOpen: () => void;
}

export default function Appbar({ setDrawerOpen }: AppbarProps) {
  return (
    <Responsive
      mobile={<MobileAppbar setDrawerOpen={setDrawerOpen} />}
      desktop={<DesktopAppbar />}
    />
  );
}
