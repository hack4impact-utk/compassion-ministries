import Link from 'next/link';
import React from 'react';
import SigninButton from './SigninButton';
import { AppBar } from '@mui/material';

// Navigation bar with 3 links and Signin Button
const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'orange' }}>
      <Link href={'/'}>Home</Link>
      <Link href={'/events'}>Events</Link>
      <Link href={'/volunteers'}>Volunteers</Link>
      <SigninButton />
    </AppBar>
  );
};

export default Navbar;
