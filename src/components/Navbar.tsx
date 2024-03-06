import Link from 'next/link';
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const links = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Events',
    href: '/events',
  },
  {
    text: 'Volunteers',
    href: '/volunteers',
  },
  {
    text: 'Organizations',
    href: '/organizations',
  },
];

export default function Navbar() {
  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        {links.map((link, index) => (
          <Typography key={index} sx={{ mx: 1 }}>
            <Link href={link.href} color="inherit">
              {link.text}
            </Link>
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  );
}
