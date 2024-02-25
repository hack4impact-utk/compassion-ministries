'use client'
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/app/components/organizations';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';

interface EditOrganizationViewProps {
    currentOrganization: OrganizationResponse;
}

function EditOrganizationView({
  currentOrganization
}: EditOrganizationViewProps){
  const [organizationData, setOrganizationData] = useState<UpsertOrganizationFormData>(
    {} as UpsertOrganizationFormData
  );

  const placeholderOnChange = (organizationData: any) => {
    setOrganizationData(organizationData);
    console.log(`From Edit Org Comp: ${organizationData.name}`);
  };

  // Use organizationData as the initial data for the OrganizationForm
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Organization
      </Typography>
      <OrganizationForm
        onChange={placeholderOnChange} // Update organizationData state directly
        organizationData={organizationData} // Pass updated organizationData state
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
