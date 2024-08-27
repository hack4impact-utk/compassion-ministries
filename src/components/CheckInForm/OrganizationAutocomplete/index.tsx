import useSnackbar from '@/hooks/useSnackbar';
import {
  CreateOrganizationRequest,
  OrganizationResponse,
} from '@/types/dataModel/organization';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { useState } from 'react';

type OrganizationOption = OrganizationResponse & { display?: string };

interface OrganizationAutocompleteProps {
  value?: OrganizationResponse;
  options: OrganizationResponse[];
  disabled?: boolean;
  onChange: (value: OrganizationResponse | undefined) => void;
  setSubmitDisabled?: (value: boolean) => void;
}

const filter = createFilterOptions<OrganizationOption>();

export default function OrganizationAutocomplete({
  value,
  options,
  disabled,
  onChange,
  setSubmitDisabled,
}: OrganizationAutocompleteProps) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  async function createNewOrganization(name: string) {
    setSubmitDisabled?.(true);
    setLoading(true);

    const orgReq: CreateOrganizationRequest = {
      name,
    };

    // make post req
    try {
      const res = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orgReq),
      });

      if (res.status === 201) {
        const data = await res.json();

        // TODO validate response
        return data.id;
      }
    } catch (e) {
      showSnackbar('Failed to create organization', 'error');
      console.error(e);
    } finally {
      setSubmitDisabled?.(false);
      setLoading(false);
    }
  }
  return (
    <Autocomplete
      freeSolo
      autoComplete
      value={(value as OrganizationOption) || ''}
      options={options as OrganizationOption[]}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(org) => (typeof org === 'string' ? org : org.name)}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.display ?? option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Organization (optional)"
          InputProps={{
            ...params.InputProps,
            endAdornment: loading ? (
              <CircularProgress size={24} />
            ) : (
              params.InputProps.endAdornment
            ),
          }}
        />
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // what is typed in the field
        const { inputValue } = params;
        const OrganizationRegex = new RegExp(params.inputValue, 'i');

        const isExisting = options.some((option) =>
          OrganizationRegex.test(option.name)
        );

        // If the inputValue does not match an existing organization, display it as `Add "[inputValue]"`
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            name: inputValue,
            display: `Add "${inputValue}"`,
            softDelete: false,
            _id: '-1',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        return filtered;
      }}
      clearOnBlur
      autoHighlight
      onChange={(_, value) => {
        if (typeof value === 'string') {
          // TODO: set error state (unknown how this would happen)
          console.error(
            'String value in organization autocomplete. Should only be objects'
          );
          // if the user has input a custom value
        } else if (value?.display) {
          // create new organization
          createNewOrganization(value.name).then((id) => {
            // updates the currently selected organization in state
            if (id) {
              const newOrg = { ...value, _id: id, display: undefined };
              onChange(newOrg);
            }
          });
          // if the user selected an existing organization, update it in state
        } else if (value) {
          onChange(value);
        } else {
          onChange(undefined);
        }
      }}
      disabled={disabled || loading}
    />
  );
}
