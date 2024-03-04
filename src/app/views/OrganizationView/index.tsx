'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationInfo from '@/components/Organization';
import { getVolunteersByOrganization } from '@/server/actions/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';

interface OrganizationViewProps {
  organization: OrganizationResponse;
}

export async function OrganizationView({
  organization,
}: OrganizationViewProps) {
  const organizationId = organization._id.toString();

  // Fetch volunteers for the organization
  const volunteers: VolunteerResponse[] =
    await getVolunteersByOrganization(organizationId);

  const handleDelete = async () => {
    try {
      // Call the DELETE API endpoint
      await fetch(`/api/organization/${organizationId}`, {
        method: 'DELETE',
      });

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  return (
    <div>
      {/* Display organization information */}
      <OrganizationInfo organization={organization} volunteers={volunteers} />

      {/* Button for editing organization */}
      <Button variant="contained">edit</Button>

      {/* Button for deleting organization */}
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
