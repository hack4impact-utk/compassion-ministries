'use client';
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/app/components/organizations';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';

const NewOrganizationView: React.FC = () => {
  //Take new Organization update
  const placeholderOnChange = (organizationData: any) => {
    setOrganizationData(organizationData);
  };

  const [organizationData, setOrganizationData] =
    useState<UpsertOrganizationFormData>({} as UpsertOrganizationFormData);

  const onClick = async () => {
    await fetch('/api/organizations', {
      method: 'POST',
      body: JSON.stringify(organizationData),
    });
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
