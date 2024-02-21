// components/RoleVerificationForm.tsx
import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { RoleVerification } from '@/types/dataModel/roles';
import { Volunteer } from '@/types/dataModel/volunteer';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';

interface RoleVerificationFormProps {
  volunteer: Volunteer;
  onChange: (verification: UpsertRoleVerificationFormData) => void;
  currentVerification?: RoleVerification;
}

const RoleVerificationForm: React.FC<RoleVerificationFormProps> = ({
  // volunteer,
  onChange,
  currentVerification,
}) => {
  const handleRoleChange = (event: { target: { value: string } }) => {
    onChange({
      role: event.target.value || '',
      lastUpdated: currentVerification?.lastUpdated || new Date(), // Provide a default date
      verifier: currentVerification?.verifier || '', // Autofill if available
    });
  };

  const handleVerifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      role: currentVerification?.role || '', // Readonly if available
      lastUpdated: currentVerification?.lastUpdated || new Date(),
      verifier: event.target.value,
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Role"
          value={currentVerification ? currentVerification.role : ''}
          onChange={handleRoleChange}
          // disabled={!!currentVerification}
        >
          <MenuItem value="role1">Role 1</MenuItem>
          <MenuItem value="role2">Role 2</MenuItem>
        </Select>
        <TextField
          label="Verifier"
          value={currentVerification ? currentVerification.verifier : ''}
          onChange={handleVerifierChange}
        />
      </FormControl>
    </Box>
  );
};

export default RoleVerificationForm;
