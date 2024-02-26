'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationInfo from '@/components/Organization';

interface OrganizationViewProps {
  organization: OrganizationResponse;
}

export function OrganizationView({ organization }: OrganizationViewProps) {
  // TODO: get volunteers from organization and pass them to the OrganizationList
  return (
    <div>
      <h1>Organization</h1>
      <OrganizationInfo organization={[organization]} />
      <button>Edit</button>
    </div>
  );
}
