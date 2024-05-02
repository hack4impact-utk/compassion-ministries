import useEditableFields from '@/hooks/useEditableFields';
import { Check, Edit } from '@mui/icons-material';
import {
  IconButton,
  TextField,
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material';

type EditableTextFieldProps<
  TVariant extends TextFieldVariants = TextFieldVariants,
> = TextFieldProps<TVariant> & {
  requireEditing?: boolean;
  name: string;
};

export default function EditableTextField<TVariant extends TextFieldVariants>({
  requireEditing,
  ...props
}: EditableTextFieldProps<TVariant>) {
  const { isEditing, stopEditing, startEditing } = useEditableFields();

  function fieldEndAdornment() {
    return isEditing(props.name) ? (
      <>
        {props.InputProps?.endAdornment}
        <IconButton
          onClick={() => stopEditing(props.name)}
          disabled={!props.value || props.value === ''}
        >
          <Check />
        </IconButton>
      </>
    ) : requireEditing ? (
      <IconButton onClick={() => startEditing(props.name)}>
        <Edit />
      </IconButton>
    ) : (
      props.InputProps?.endAdornment
    );
  }

  return (
    <TextField
      {...props}
      disabled={props.disabled || (requireEditing && !isEditing(props.name))}
      InputProps={{
        ...props.InputProps,
        endAdornment: fieldEndAdornment(),
      }}
    />
  );
}
