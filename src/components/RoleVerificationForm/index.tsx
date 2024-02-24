import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  RoleVerification,
  VerifiedRole,
  verifiedRoles,
} from '@/types/dataModel/roles';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';

// Role and Verifier Information
interface RoleVerificationFormProps {
  roleVerificationData: UpsertRoleVerificationFormData;
  onChange: (verification: UpsertRoleVerificationFormData) => void;
  currentVerification: RoleVerification;
}

function RoleVerificationForm({
  roleVerificationData,
  onChange,
  currentVerification,
}: RoleVerificationFormProps) {
  return (
    <Box sx={{ minWidth: 120 }} pt={2}>
      {/* Select Role */}
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          value={(currentVerification?.role ?? roleVerificationData.role) || ''}
          onChange={(e) =>
            onChange({
              ...roleVerificationData,
              role: e.target.value as VerifiedRole,
            })
          }
          inputProps={{ readOnly: !!currentVerification }}
        >
          {verifiedRoles.map((role, i) => (
            <MenuItem value={role} key={i}>
              {role}
            </MenuItem>
          ))}
        </Select>
        {/* Type Verifier */}
        <TextField
          sx={{ mt: 2 }}
          label="Verifier"
          onChange={(e) =>
            onChange({ ...roleVerificationData, verifier: e.target.value })
          }
          defaultValue={currentVerification?.verifier ?? ''}
        />
      </FormControl>
    </Box>
  );
}

export default RoleVerificationForm;
