import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
  buttonProps?: ButtonProps;
  loading: boolean;
  children?: React.ReactNode;
  loadingSize?: number;
}

export default function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button {...props.buttonProps} disabled={props.loading}>
      {props.loading ? (
        <CircularProgress size={`${props.loadingSize}px`} />
      ) : (
        props.children
      )}
    </Button>
  );
}
