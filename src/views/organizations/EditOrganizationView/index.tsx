'use client'
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/app/components/organizations';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';

interface EditOrganizationViewProps {
    currentOrganization: OrganizationResponse;
}

const EditOrganizationView: React.FC<EditOrganizationViewProps> = ({ currentOrganization }) => {
    const [organizationData, setOrganizationData] = useState<UpsertOrganizationFormData>(
        {} as UpsertOrganizationFormData
      );
    
    const placeholderOnChange = (organizationData: any) => {
    setOrganizationData(organizationData);
    console.log(`From Edit Org Comp: ${organizationData}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Organization
      </Typography>
      <OrganizationForm
        onChange={placeholderOnChange}
        organizationData={{ name: currentOrganization.name }} // Pass initial data
        currentOrganization={currentOrganization}
      />
      <Box mt={2}>
        <Button variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EditOrganizationView;
