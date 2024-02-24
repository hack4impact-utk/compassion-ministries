import React from 'react';
import { Box, TextField } from '@mui/material';
import { UpsertOrganizationFormData } from '@/types/forms/organizations';
import {
  OrganizationResponse,
  UpdateOrganizationRequest,
} from '@/types/dataModel/organization';

// Organization Form Information
interface OrganizationFormProps {
  organizationData: UpsertOrganizationFormData;
  onChange: (organization: UpdateOrganizationRequest) => void;
  currentOrganization?: OrganizationResponse;
}

function OrganizationForm({
  organizationData,
  onChange,
  currentOrganization,
}: OrganizationFormProps) {
  console.log(organizationData.name);

  React.useEffect(() => {
    onChange({ ...organizationData, name: currentOrganization?.name || '' });
  }, [currentOrganization?.name]);

  return (
    <Box sx={{ minWidth: 120 }} pt={2}>
      {/* Update Organization Name */}
      <TextField
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
