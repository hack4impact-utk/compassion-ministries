import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
  buttonProps?: ButtonProps;
  loading: boolean;
  children?: React.ReactNode;
  loadingSize?: number;
}

export default function LoadingButton(props: LoadingButtonProps) {
  const disabled = props.loading || props.buttonProps?.disabled;
  const size = props.loadingSize || 24;
  return (
    <Button {...props.buttonProps} disabled={disabled}>
      {props.loading ? <CircularProgress size={`${size}px`} /> : props.children}
    </Button>
  );
}
