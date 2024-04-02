'use client';
import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import OrganizationForm from '@/components/OrganizationForm';
import {
  UpsertOrganizationFormData,
  zUpsertOrganizationFormData,
} from '@/types/forms/organizations';
import useSnackbar from '@/hooks/useSnackbar';
import { useRouter } from 'next/navigation';
import useValidation from '@/hooks/useValidation';
import { ValidationErrors } from '@/utils/validation';

const NewOrganizationView: React.FC = () => {
  //Take new Organization update
  const placeholderOnChange = (
    organizationData: UpsertOrganizationFormData
  ) => {
    setOrganizationData(organizationData);
  };

  const [organizationData, setOrganizationData] =
    useState<UpsertOrganizationFormData>({} as UpsertOrganizationFormData);
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<UpsertOrganizationFormData> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const validate = useValidation(zUpsertOrganizationFormData);

  // hits post organization endpoint to add to database
  const onClick = async () => {
    // vaildate the form
    const validationResult = validate(organizationData);
    if (validationResult) {
      setValidationErrors(validationResult);
      return;
    }

    // clear validation errors
    setValidationErrors(undefined);

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
        errors={validationErrors}
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
