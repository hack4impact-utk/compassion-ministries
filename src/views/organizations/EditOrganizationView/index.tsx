'use client';
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/components/OrganizationForm';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';

// Organization props
interface EditOrganizationViewProps {
  currentOrganization: OrganizationResponse;
}

// Edit Organization Name
function EditOrganizationView({
  currentOrganization,
}: EditOrganizationViewProps) {
  const [organizationData, setOrganizationData] =
    useState<UpsertOrganizationFormData>({} as UpsertOrganizationFormData);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  // Update the organization Name here
  const onChange = (newOrgData: UpsertOrganizationFormData) => {
    setOrganizationData(newOrgData);
  };

  // hit put organization endpoint
  const onClick = async () => {
    try {
      const res = await fetch(`/api/organizations/${currentOrganization._id}`, {
        method: 'PUT',
        body: JSON.stringify(organizationData),
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(`${data.message}`, 'error');
        return;
      }

      router.push(`/organizations/${currentOrganization._id}`);
      router.refresh();
      showSnackbar('Organization updated successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to update organization', 'error');
      console.error(e);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>
        Edit Organization
      </Typography>
      <OrganizationForm
        onChange={onChange}
        organizationData={organizationData}
        currentOrganization={currentOrganization}
      />
      <Box mt={2}>
        <Button variant="contained" onClick={onClick} fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
export default EditOrganizationView;
