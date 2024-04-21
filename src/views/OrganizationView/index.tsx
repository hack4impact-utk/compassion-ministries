'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import Organization from '@/components/Organization';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';
import Link from 'next/link';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import useDeleteConfirmation from '@/hooks/useDeleteConfirmation';

export interface OrganizationViewProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

export function OrganizationView({
  organization,
  volunteers,
}: OrganizationViewProps) {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const confirmDelete = useDeleteConfirmation({
    title: 'Are you sure you want to delete this organization?',
    confirmationKeyword: organization.name,
  });

  const organizationId = organization._id.toString();

  const handleDelete = async () => {
    try {
      if (!(await confirmDelete())) {
        return;
      }

      // Call the DELETE API endpoint
      const res = await fetch(`/api/organizations/${organizationId}`, {
        method: 'DELETE',
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(data.message, 'error');
        return;
      }

      router.push('/organizations');
      router.refresh();
      showSnackbar('Organization deleted successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to delete organization', 'error');
      console.error(e);
    }
  };

  return (
    <div>
      {/* Display organization information */}
      <Organization organization={organization} volunteers={volunteers} />

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
