import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface NavigationDrawerListItemProps {
  text: string;
  icon: React.ReactNode;
  href: string;
}

export default function NavigationDrawerListItem(
  props: NavigationDrawerListItemProps
) {
  return (
    <Link
      href={props.href}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItemButton>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText
          primary={props.text}
          primaryTypographyProps={{ variant: 'body1' }}
        />
      </ListItemButton>
    </Link>
  );
}
