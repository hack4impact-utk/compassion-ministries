'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';

interface OrganizationViewProps {
  organization: OrganizationResponse;
}

export function OrganizationView({ organization }: OrganizationViewProps) {
  return (
    <div>
      <h1>Organization</h1>
      <p>Name: {organization.name}</p>
      <button>Edit</button>
    </div>
  );
}
