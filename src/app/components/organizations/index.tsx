import React from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';
import { OrganizationResponse } from '@/types/dataModel/organization';

// Organization Form Information
interface OrganizationFormProps {
  organizationData: UpsertOrganizationFormData;
  onChange: (organization: UpsertOrganizationFormData) => void;
  currentOrganization?: OrganizationResponse;
}

function OrganizationForm({
  organizationData,
  onChange,
  currentOrganization,
}: OrganizationFormProps) {
  React.useEffect(() => {
    onChange({ ...organizationData, name: currentOrganization?.name || '' });
  }, [currentOrganization?.name]);

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* Update Organization Name */}
      <TextField fullWidth
        label="Organization Name"
        onChange={(e) =>
          onChange({ ...organizationData, name: e.target.value })
        }
        value={organizationData.name || ''}
      />
    </Box>
  );
}

export default OrganizationForm;