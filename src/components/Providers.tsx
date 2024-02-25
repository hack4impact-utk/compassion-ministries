'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConfirmProvider } from 'material-ui-confirm';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

// Returning the next auth provider
interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ConfirmProvider>{props.children}</ConfirmProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default Providers;
