'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationInfo from '@/components/Organization';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';
import Link from 'next/link';

export interface OrganizationViewProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

export function OrganizationView({
  organization,
  volunteers,
}: OrganizationViewProps) {
  const organizationId = organization._id.toString();

  const handleDelete = async () => {
    try {
      // Call the DELETE API endpoint
      await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
      });

      window.location.href = '/organizations';
    } catch (error) {
      // maybe change this to soomething else at some point idk
      console.error('Error deleting organization:', error);
    }
  };

  return (
    <div>
      {/* Display organization information */}
      <OrganizationInfo organization={organization} volunteers={volunteers} />

      {/* Button for editing organization */}
      <Link href={`/organizations/${organizationId}/edit`}>
        <Button variant="contained">Edit</Button>
      </Link>

      {/* Button for deleting organization */}
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
