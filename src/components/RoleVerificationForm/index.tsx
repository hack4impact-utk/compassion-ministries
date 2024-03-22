import React from 'react';
import { Box, FormControl, MenuItem, TextField } from '@mui/material';
import {
  RoleVerification,
  VerifiedRole,
  verifiedRoles,
} from '@/types/dataModel/roles';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';
import { ValidationErrors } from '@/utils/validation';

// Role and Verifier Information
interface RoleVerificationFormProps {
  roleVerificationData: UpsertRoleVerificationFormData;
  onChange: (verification: UpsertRoleVerificationFormData) => void;
  currentVerification?: RoleVerification;
  errors?: ValidationErrors<UpsertRoleVerificationFormData>;
}

function RoleVerificationForm({
  roleVerificationData,
  onChange,
  currentVerification,
  errors,
}: RoleVerificationFormProps) {
  return (
    <Box sx={{ minWidth: 120 }} pt={2}>
      {/* Select Role */}
      <FormControl fullWidth>
        <TextField
          label="Role"
          placeholder=""
          select
          value={(currentVerification?.role ?? roleVerificationData.role) || ''}
          onChange={(e) =>
            onChange({
              ...roleVerificationData,
              role: e.target.value as VerifiedRole,
            })
          }
          inputProps={{ readOnly: !!currentVerification }}
          error={!!errors?.role}
          helperText={errors?.role}
        >
          {verifiedRoles.map((role, i) => (
            <MenuItem value={role} key={i}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        {/* Type Verifier */}
        <TextField
          sx={{ mt: 2 }}
          label="Verifier"
          onChange={(e) =>
            onChange({ ...roleVerificationData, verifier: e.target.value })
          }
          defaultValue={currentVerification?.verifier ?? ''}
          error={!!errors?.verifier}
          helperText={errors?.verifier}
        />
      </FormControl>
    </Box>
  );
}

export default RoleVerificationForm;
