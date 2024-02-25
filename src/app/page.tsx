'use client';
import useRoleConfirmation from '@/hooks/useRoleConfirmation';
import { Button } from '@mui/material';

export default function Home() {
  const confirm = useRoleConfirmation();

  const handleConfirm = async () => {
    const verifier = await confirm('admin');
    console.log('what???', verifier);
  };

  return (
    <>
      <h1>Home page</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleConfirm()}
      >
        Test
      </Button>
    </>
  );
}
