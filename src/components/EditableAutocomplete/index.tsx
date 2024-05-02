import useEditableFields from '@/hooks/useEditableFields';
import { Check, Edit } from '@mui/icons-material';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  ChipTypeMap,
  IconButton,
} from '@mui/material';

interface EditableAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > {
  requireEditing?: boolean;
  name: string;
}

export default function EditableAutocomplete<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>({
  requireEditing,
  ...props
}: EditableAutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) {
  const { isEditing, stopEditing, startEditing } = useEditableFields();

  function fieldEndAdornment(endAdornment: React.ReactNode) {
    return isEditing(props.name) ? (
      <>
        {endAdornment}
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
      endAdornment
    );
  }

  const renderInputWrapper = (params: AutocompleteRenderInputParams) => {
    return props.renderInput({
      ...params,
      InputProps: {
        ...params.InputProps,
        endAdornment: fieldEndAdornment(params.InputProps.endAdornment),
      },
    });
  };
  return (
    <Autocomplete
      {...props}
      options={requireEditing ? [] : props.options}
      disabled={props.disabled || (requireEditing && !isEditing(props.name))}
      renderInput={renderInputWrapper}
    />
  );
}
