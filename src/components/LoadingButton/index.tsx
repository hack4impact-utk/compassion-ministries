import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
  buttonProps?: ButtonProps;
  loading: boolean;
  children?: React.ReactNode;
  loadingSize?: number;
}

export default function LoadingButton(props: LoadingButtonProps) {
  const disabled = props.loading || props.buttonProps?.disabled;
  return (
    <Button {...props.buttonProps} disabled={disabled}>
      {props.loading ? (
        <CircularProgress size={`${props.loadingSize}px`} />
      ) : (
        props.children
      )}
    </Button>
  );
}
