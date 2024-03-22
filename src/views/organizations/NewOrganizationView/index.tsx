'use client';
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/components/OrganizationForm';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';

const NewOrganizationView: React.FC = () => {
  //Take new Organization update
  const placeholderOnChange = (
    organizationData: UpsertOrganizationFormData
  ) => {
    setOrganizationData(organizationData);
  };

  const [organizationData, setOrganizationData] =
    useState<UpsertOrganizationFormData>({} as UpsertOrganizationFormData);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  // hits post organization endpoint to add to database
  const onClick = async () => {
    try {
      const res = await fetch('/api/organizations', {
        method: 'POST',
        body: JSON.stringify(organizationData),
      });
      const data = await res.json();

      if (res.status !== 201) {
        showSnackbar(`${data.message}`, 'error');
        return;
      }

      router.push(`/organizations/${data.id}`);
      router.refresh();
      showSnackbar('Organization created successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to create organization', 'error');
      console.error(e);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>
        Create New Organization
      </Typography>
      <OrganizationForm
        organizationData={organizationData}
        onChange={placeholderOnChange}
      />
      <Box mt={2}>
        <Button variant="contained" onClick={onClick} fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default NewOrganizationView;
