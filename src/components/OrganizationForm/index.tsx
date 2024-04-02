import React from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { ValidationErrors } from '@/utils/validation';

// Organization Form Information
interface OrganizationFormProps {
  organizationData: UpsertOrganizationFormData;
  onChange: (organization: UpsertOrganizationFormData) => void;
  currentOrganization?: OrganizationResponse;
  errors?: ValidationErrors<UpsertOrganizationFormData>;
}

function OrganizationForm({
  organizationData,
  onChange,
  currentOrganization,
  errors,
}: OrganizationFormProps) {
  React.useEffect(() => {
    onChange({ ...organizationData, name: currentOrganization?.name || '' });
  }, [currentOrganization?.name]);

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* Update Organization Name */}
      <TextField
        fullWidth
        label="Organization Name"
        onChange={(e) =>
          onChange({ ...organizationData, name: e.target.value })
        }
        value={organizationData.name || ''}
        error={!!errors?.name}
        helperText={errors?.name}
      />
    </Box>
  );
}

export default OrganizationForm;
