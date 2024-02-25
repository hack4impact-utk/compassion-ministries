'use client'
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/app/components/organizations';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';

const NewOrganizationView: React.FC = () => {
  const placeholderOnChange = (organizationData: any) => {
    setOrganizationData(organizationData);
    console.log(`From New Org Comp: ${organizationData.name}`);
  };
  
  const [organizationData, setOrganizationData] = useState<UpsertOrganizationFormData>(
    {} as UpsertOrganizationFormData
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom  mt={2}>
        Create New Organization
      </Typography>
      <OrganizationForm 
        organizationData = {organizationData}
        onChange={placeholderOnChange}
      />
      <Box mt={2}>
        <Button variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default NewOrganizationView;
