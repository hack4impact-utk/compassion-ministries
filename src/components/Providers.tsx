'use client';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

// Returning the next auth provider
interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;
