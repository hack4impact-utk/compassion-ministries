'use client';

import { Box } from '@mui/material';
import Providers from '../Providers';
import React, { useState } from 'react';
import Appbar from '../Appbar';
import NavigationDrawer from '../NavigationDrawer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Providers>
      <Appbar setDrawerOpen={() => setDrawerOpen(true)} />
      <Box component="section" sx={{ display: 'flex' }}>
        <NavigationDrawer
          open={drawerOpen}
          closeDrawer={() => setDrawerOpen(false)}
        />
        <Box component="main" sx={{ p: 2, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Providers>
  );
}
