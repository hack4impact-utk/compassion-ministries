import Link from 'next/link';
import React from 'react';
import SigninButton from './SigninButton';
import { AppBar, Typography } from '@mui/material';

// Navigation bar with 3 links and Signin Button
const Navbar = () => {
  return (
    <AppBar position="static">
      <Typography>
        <Link href={'/'} color="inherit">
          Home
        </Link>
      </Typography>
      <Typography>
        <Link href={'/events'} color="inherit">
          Events
        </Link>
      </Typography>
      <Typography>
        <Link href={'/volunteers'} color="inherit">
          Volunteers
        </Link>
      </Typography>
      <SigninButton />
    </AppBar>
  );
};

export default Navbar;
