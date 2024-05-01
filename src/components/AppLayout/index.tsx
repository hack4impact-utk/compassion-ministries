'use client';

import { Box, ThemeProvider } from '@mui/material';
import Providers from '../Providers';
import React, { useState } from 'react';
import Appbar from '../Appbar';
import NavigationDrawer from '../NavigationDrawer';
import theme from '@/utils/theme';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Providers>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Providers>
  );
}
