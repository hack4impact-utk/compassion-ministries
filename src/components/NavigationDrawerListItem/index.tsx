import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

interface NavigationDrawerListItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function NavigationDrawerListItem(
  props: NavigationDrawerListItemProps
) {
  return (
    <ListItemButton onClick={props.onClick}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText
        primary={props.text}
        primaryTypographyProps={{ variant: 'body1' }}
      />
    </ListItemButton>
  );
}
