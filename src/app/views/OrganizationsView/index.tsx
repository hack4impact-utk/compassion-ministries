'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationList from '@/components/organizations/OrganizationList';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

interface OrganizationsViewProps {
  organizations: OrganizationResponse[];
}

// display the OrganizationList component and an edit buttom
export function OrganizationsView({ organizations }: OrganizationsViewProps) {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Organizations
      </Typography>
      <Link href="/organizations/new">
        <Button variant="contained" fullWidth>
          New organization
        </Button>
      </Link>
      <OrganizationList organizationResponses={organizations} />
    </div>
  );
}
