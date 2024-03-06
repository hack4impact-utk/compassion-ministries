import { DialogContentText, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface ConfirmContentProps {
  setVerifier: Dispatch<SetStateAction<string>>;
}

export default function ConfirmContent({ setVerifier }: ConfirmContentProps) {
  return (
    <>
      <DialogContentText>Verify them now, or cancel.</DialogContentText>
      <TextField
        id="name"
        label="Verifier"
        fullWidth
        autoFocus
        sx={{ mt: 2 }}
        onChange={(e) => {
          setVerifier(e.target.value);
        }}
      />
    </>
  );
}
