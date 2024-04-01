'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationList from '@/components/organizations/OrganizationList';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import SearchField from '@/components/SearchField';
import useSearch from '@/hooks/useSearch';

interface OrganizationsViewProps {
  organizations: OrganizationResponse[];
}

// display the OrganizationList component and an edit buttom
export function OrganizationsView({ organizations }: OrganizationsViewProps) {
  const search = useSearch();

  if (search.length > 0) {
    organizations = organizations.filter((organization) =>
      `${organization.name}`.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div>
      <SearchField />
      <Typography variant="h3" sx={{ mb: 2 }}>
        Organizations
      </Typography>
      <Link href="/organizations/new">
        <Button variant="contained" fullWidth>
          New organization
        </Button>
      </Link>
      <OrganizationList organizations={organizations} />
    </div>
  );
}
