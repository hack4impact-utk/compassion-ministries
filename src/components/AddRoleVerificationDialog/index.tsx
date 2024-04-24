import { Dialog, Button, DialogActions, DialogContent } from '@mui/material';
import RoleVerificationForm from '../RoleVerificationForm';
import {
  UpsertRoleVerificationFormData,
  zUpsertRoleVerificationFormData,
} from '@/types/forms/role-verifications';
import { useState } from 'react';
import { ValidationErrors } from '@/utils/validation';
import useValidation from '@/hooks/useValidation';
import LoadingButton from '../LoadingButton';

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
  const validate = useValidation(zUpsertRoleVerificationFormData);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    // Validate the data
    const validationErrors = validate(formData);
    if (validationErrors) {
      setValidationErrors(validationErrors);
      return;
    }

    // Clear the validation errors
    setValidationErrors(undefined);

    // Submit the data
    try{
      setIsLoading(true);
      await onSubmit(formData);
    }
    finally{
      setIsLoading(false);
    }
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
        <LoadingButton loading={isLoading} variant="text" onClick={handleSubmit}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
