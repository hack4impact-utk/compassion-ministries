'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationList from '@/components/organizations/OrganizationList';

interface OrganizationsViewProps {
  organizations: OrganizationResponse[];
}

// display the OrganizationList component and an edit buttom
export function OrganizationsView({ organizations }: OrganizationsViewProps) {
  return (
    <div>
      <h1>Organizations</h1>
      <OrganizationList organizationResponses={organizations} />
    </div>
  );
}
