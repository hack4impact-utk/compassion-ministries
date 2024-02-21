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
import {
  RoleVerification,
  VerifiedRole,
  verifiedRoles,
} from '@/types/dataModel/roles';
// import { Volunteer } from '@/types/dataModel/volunteer';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';

interface RoleVerificationFormProps {
  // volunteer: Volunteer;
  roleVerificationData: UpsertRoleVerificationFormData;
  onChange: (verification: UpsertRoleVerificationFormData) => void;
  currentVerification?: RoleVerification;
}

const RoleVerificationForm: React.FC<RoleVerificationFormProps> = ({
  // volunteer,
  roleVerificationData,
  onChange,
  currentVerification,
}: RoleVerificationFormProps) => {
  console.log(`Name: ${roleVerificationData}`);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Role"
          value={
            currentVerification
              ? currentVerification.role
              : roleVerificationData.role
          }
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
        <TextField
          label="Verifier"
          value={
            roleVerificationData.verifier
              ? roleVerificationData.verifier
              : currentVerification?.verifier ?? ''
          }
          onChange={(e) =>
            onChange({ ...roleVerificationData, verifier: e.target.value })
          }
        />
      </FormControl>
    </Box>
  );
};

export default RoleVerificationForm;
