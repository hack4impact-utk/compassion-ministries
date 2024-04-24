import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children?: React.ReactNode;
  loadingSize?: number;
}

export default function LoadingButton({
  loading, loadingSize, children,
  ...buttonProps
}: LoadingButtonProps) {
  return (
    <Button {...buttonProps} disabled={loading || buttonProps.disabled}>
      {loading ? (
        <CircularProgress size={`${loadingSize}px`} />
      ) : (
        children
      )}
    </Button>
  );
}
