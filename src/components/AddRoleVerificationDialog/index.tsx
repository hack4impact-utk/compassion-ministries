import { Dialog, Button, DialogActions, DialogContent } from '@mui/material';
import RoleVerificationForm from '../RoleVerificationForm';
import {
  UpsertRoleVerificationFormData,
  zUpsertRoleVerificationFormData,
} from '@/types/forms/role-verifications';
import { useState } from 'react';
import { ValidationErrors } from '@/utils/validation';
import useValidation from '@/hooks/useValidation';
import useSnackbar from '@/hooks/useSnackbar';

interface AddRoleVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpsertRoleVerificationFormData) => Promise<void>;
}

export default function AddRoleVerificationDialog({
  open,
  onClose,
  onSubmit,
}: AddRoleVerificationDialogProps) {
  const [formData, setFormData] = useState<UpsertRoleVerificationFormData>(
    {} as UpsertRoleVerificationFormData
  );
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<UpsertRoleVerificationFormData> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();
  const validate = useValidation(zUpsertRoleVerificationFormData);
  const handleSubmit = async () => {
    // Validate the data
    const validationErrors = validate(formData);
    if (validationErrors) {
      setValidationErrors(validationErrors);
      showSnackbar("Role verification failed. Check in again to verify volunteer");
      return;
    }

    // Clear the validation errors
    setValidationErrors(undefined);

    // Submit the data
    await onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({} as UpsertRoleVerificationFormData);
    setValidationErrors(undefined);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <RoleVerificationForm
          roleVerificationData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
          errors={validationErrors}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
