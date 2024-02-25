'use client';
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/app/components/organizations';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';

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

  // Update the organization Name here
  const placeholderOnChange = (organizationData: any) => {
    setOrganizationData(organizationData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>
        Edit Organization
      </Typography>
      <OrganizationForm
        onChange={placeholderOnChange}
        organizationData={organizationData}
        currentOrganization={currentOrganization}
      />
      <Box mt={2}>
        <Button variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
export default EditOrganizationView;