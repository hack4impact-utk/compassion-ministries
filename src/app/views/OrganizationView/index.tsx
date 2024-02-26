'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import  OrganizationList  from '@/components/organizations/OrganizationList';

interface OrganizationViewProps {
  organization: OrganizationResponse;
}

export function OrganizationView({ organization }: OrganizationViewProps) {
    return (
    <div>
      <h1>Organization</h1>
      <OrganizationList organizationResponses={[organization]} />
      <button>Edit</button>
    </div>
  );
}
