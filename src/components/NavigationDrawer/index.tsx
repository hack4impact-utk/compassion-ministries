import useResponsive from '@/hooks/useResponsive';
import { Box, Divider, Drawer, List } from '@mui/material';
import React from 'react';
import NavigationDrawerListItem from '../NavigationDrawerListItem';
import EventIcon from '@mui/icons-material/Event';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import ChurchIcon from '@mui/icons-material/Church';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const routes: { text: string; icon: React.ReactNode; href: string }[] = [
  {
    text: 'Events',
    icon: <EventIcon />,
    href: '/events',
  },
  {
    text: 'Volunteers',
    icon: <Diversity3OutlinedIcon />,
    href: '/volunteers',
  },
  {
    text: 'Organizations',
    icon: <ChurchIcon />,
    href: '/organizations',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings',
  },
];

export default function NavigationDrawer(props: NavigationDrawerProps) {
  const responsive = useResponsive();
  const router = useRouter();

  function clickHandler(href: string) {
    router.push(href);
    props.setOpen(false);
  }

  return (
    <Drawer
      variant={responsive.isDesktop ? 'permanent' : 'temporary'}
      open={props.open}
      onClose={() => props.setOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '280px',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box>
        <Image
          src="/logo.png"
          alt="Community-Coalition-logo"
          width="280"
          height="150"
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
      <Divider sx={{ pt: 1.5 }} />
      <List disablePadding sx={{ pl: 0.8, pt: 1 }}>
        {routes.map((route, i) => (
          <NavigationDrawerListItem
            key={i}
            text={route.text}
            icon={route.icon}
            onClick={() => clickHandler(route.href)}
          ></NavigationDrawerListItem>
        ))}
      </List>
    </Drawer>
  );
}
