'use client';
import { EventResponse } from '@/types/dataModel/event';
import {
  CreateOrganizationRequest,
  OrganizationResponse,
} from '@/types/dataModel/organization';
import { Role } from '@/types/dataModel/roles';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
import { ValidationErrors } from '@/utils/validation';
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  createFilterOptions,
  LinearProgress,
  IconButton,
  Button,
} from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatPhoneNumber } from '@/utils/phone-number';
import createBarcodeScanner from '@/utils/barcode/listener';
import { capitalizeWords } from '@/utils/string';
import { Check, Edit } from '@mui/icons-material';

/*
This component has a lot going on. It primarily does three things:
1. Allows the user to scan a license and autofill the data from that
2. Autofills data when the user types in an email, first name, and last name
3. Allows the user to edit the fields relating to the volunteer itself.

TODO: explain 1 and 2

For 3, the component has a few key parts:
- The `editingFields` state is a record of which fields the user is currently editing
- The `editField` function is called when the user clicks the edit button for a field. This sets the corresponding field in `editingFields` to true
- The `stopEditingField` function is called when the user clicks the check button for a field. This sets the corresponding field in `editingFields` to false
- The `fieldEndAdornment` function is a helper function that returns the end adornment for a field. If the user is editing the field, it returns a check button. If the user is not editing the field, it returns an edit button

When the user autofills data, the `hasVolunteer` field is updated to be `true`. This allows the form to know that we have autofilled, and the user to edit the fields that were autofilled.
They can do this by clicking the edit button next to the field. When they do this, the field becomes editable and the check button appears. When they click the check button, the field becomes uneditable and the edit button reappears.
These edits are tracked simply passed up through the `onChange` prop to the parent component, where the parent will determine how to handle editing
*/

interface Props {
  volunteers: VolunteerResponse[];
  event: EventResponse;
  organizations: OrganizationResponse[];
  checkInData: CheckInFormData;
  onChange: (checkInData: CheckInFormData) => void;
  errors?: ValidationErrors<CheckInFormData>;
  setSubmitDisabled?: (disabled: boolean) => void;
}

type OrganizationOption = OrganizationResponse & { display?: string };

const filter = createFilterOptions<OrganizationOption>();

// TODO prevent input of role that the volunteer is not verified for
export default function CheckInForm(props: Props) {
  const [volunteerOptions, setVolunteerOptions] = useState<VolunteerResponse[]>(
    props.volunteers
  );
  const [editingFields, setEditingFields] = useState<
    Record<keyof CheckInFormData, string>
  >({} as Record<keyof CheckInFormData, string>);

  const [licenseLoading, setLicenseLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const hasVolunteer = useMemo(() => {
    return !!props.checkInData.volunteerId;
  }, [props.checkInData.volunteerId]);

  // add barcode listeners
  useEffect(() => {
    createBarcodeScanner(200);

    // add listeners for barcode events
    window.addEventListener('onbarcode', (e: any) => {
      props.setSubmitDisabled?.(false);
      setLicenseLoading(false);
      const { data } = e.detail;

      const first = capitalizeWords(data.firstName);
      const last = capitalizeWords(data.lastName);
      const street = capitalizeWords(data.addressStreet);
      const city = capitalizeWords(data.addressCity);
      const zip = data.addressPostalCode.substr(0, 5);
      const state = data.addressState;
      const address = `${street}, ${city}, ${state} ${zip}`;

      const searchSuccess = autofill({
        firstName: first,
        lastName: last,
        address,
      });

      // focus email input
      if (!searchSuccess) {
        setTimeout(() => {
          emailRef.current?.focus();
        }, 50);
      }
    });

    window.addEventListener('onbarcodestart', () => {
      setLicenseLoading(true);
      props.setSubmitDisabled?.(true);
    });
  }, []);

  // when the parent updates the volunteers it's passing in, update our state
  // TODO this can be removed once SSR provides props
  useEffect(() => setVolunteerOptions(props.volunteers), [props.volunteers]);

  function editField(field: keyof CheckInFormData) {
    props.setSubmitDisabled?.(true);
    setEditingFields({ ...editingFields, [field]: true });
  }

  function stopEditingField(field: keyof CheckInFormData) {
    const updatedEditingFields = { ...editingFields, [field]: false };

    if (
      Object.keys(updatedEditingFields).every(
        (key) => !updatedEditingFields[key as keyof CheckInFormData]
      )
    ) {
      props.setSubmitDisabled?.(false);
    }
    setEditingFields(updatedEditingFields);
  }

  async function createNewOrganization(name: string) {
    props.setSubmitDisabled?.(true);
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

      props.setSubmitDisabled?.(false);
      if (res.status === 201) {
        const data = await res.json();

        // TODO validate response
        return data.id;
      }
    } catch (e) {
      console.error('failed to create new organization: ', e);
      props.setSubmitDisabled?.(false);
    }
  }

  // when the user enters in a first/last name, filter the options of the first/last/email fields to match possible values
  function onNameChange(value: string, type: 'first' | 'last') {
    // narrow down available options for name/email based on name input
    if (type === 'first') {
      // if both name text boxes are cleared, it should go back to displaying all options
      if (!value && !props.checkInData.lastName) {
        setVolunteerOptions(props.volunteers);
        return;
      }

      const firstNameRegex = new RegExp(value, 'i');
      const lastNameRegex = new RegExp(props.checkInData.lastName, 'i');
      setVolunteerOptions(
        props.volunteers.filter(
          (vol) =>
            firstNameRegex.test(vol.firstName) &&
            lastNameRegex.test(vol.lastName)
        )
      );
      autofill({
        firstName: value,
        lastName: props.checkInData.lastName,
        email: props.checkInData.email || '',
      });
    } else {
      // if both name text boxes are cleared, it should go back to displaying all options
      if (!value && !props.checkInData.firstName) {
        setVolunteerOptions(props.volunteers);
        return;
      }

      const lastNameRegex = new RegExp(value, 'i');
      const firstNameRegex = new RegExp(props.checkInData.firstName, 'i');
      setVolunteerOptions(
        volunteerOptions.filter(
          (vol) =>
            firstNameRegex.test(vol.firstName) &&
            lastNameRegex.test(vol.lastName)
        )
      );

      autofill({
        firstName: props.checkInData.firstName,
        lastName: value,
        email: props.checkInData.email || '',
      });
    }
  }

  function onEmailChange(email: string) {
    // if the form is already filled, don't autofill
    if (!hasVolunteer) {
      autofill({ ...props.checkInData, email });
    }
  }

  /**
   * Autofills the form based on the passed in search fields
   * @param search The fields to search for
   * @returns True if a single match was found and autofilled, false otherwise
   */
  function autofill(search: Partial<CheckInFormData>) {
    // we only want to search on volunteer fields
    search.role = undefined;
    search.organization = undefined;

    // narrow down available options based on the passed in fields
    const volunteerMatches = props.volunteers.filter((vol) => {
      return Object.keys(search).every((key) => {
        const searchVal = search[key as keyof CheckInFormData];
        if (searchVal === '' || searchVal === null) {
          return true;
        }
        return (
          searchVal?.toString().toLowerCase() ===
          vol[key as keyof VolunteerResponse]?.toString().toLowerCase()
        );
      });
    });

    // if we have a single match, autofill the form
    if (volunteerMatches.length === 1) {
      const vol = volunteerMatches[0];
      const updatedFormData: CheckInFormData = {
        ...props.checkInData,
        firstName: vol.firstName,
        lastName: vol.lastName,
        email: vol.email,
        phoneNumber: formatPhoneNumber(vol.phoneNumber),
        address: vol.address,
        organization: vol.previousOrganization,
        volunteerId: vol._id,
      };

      // ensure we only set the role if the event has it
      if (
        vol.previousRole &&
        props?.event?.eventRoles.includes(vol.previousRole)
      ) {
        updatedFormData.role = vol.previousRole;
      }
      props.onChange(updatedFormData);
      return true;
    } else {
      // if we have multiple matches or no matches, just fill the search into the form
      props.onChange({
        ...props.checkInData,
        ...search,
      });

      return false;
    }
  }

  function clearForm() {
    props.onChange({
      role:
        props.event.eventRoles.length === 1 ? props.event.eventRoles[0] : null,
    } as CheckInFormData);
  }

  function fieldEndAdornment(
    field: keyof CheckInFormData,
    endAdornment: React.ReactNode = null
  ) {
    return editingFields[field] ? (
      <>
        {endAdornment}
        <IconButton
          onClick={() => stopEditingField(field)}
          disabled={
            !props.checkInData[field] || props.checkInData[field] === ''
          }
        >
          <Check />
        </IconButton>
      </>
    ) : hasVolunteer ? (
      <IconButton onClick={() => editField(field)}>
        <Edit />
      </IconButton>
    ) : (
      endAdornment
    );
  }

  const computedVolunteerOptions = useMemo(() => {
    if (!hasVolunteer) {
      return volunteerOptions;
    }
    return [];
  }, [volunteerOptions, hasVolunteer]);

  return (
    <>
      {licenseLoading && <LinearProgress />}
      {hasVolunteer && (
        <Button variant="outlined" onClick={clearForm}>
          Clear volunteer
        </Button>
      )}
      <Box pt={2}>
        {/* Last name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          value={props.checkInData.lastName || ''}
          options={computedVolunteerOptions}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(vol) =>
            typeof vol === 'string' ? vol : vol.lastName
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.lastName}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Last Name"
              onChange={(e) => {
                props.onChange({
                  ...props.checkInData,
                  lastName:
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1),
                });
                onNameChange(e.target.value, 'last');
              }}
              error={!!props.errors?.lastName}
              helperText={props.errors?.lastName}
              InputProps={{
                ...params.InputProps,
                endAdornment: fieldEndAdornment(
                  'lastName',
                  params.InputProps.endAdornment
                ),
              }}
            />
          )}
          onInputChange={(_, value) => {
            props.onChange({ ...props.checkInData, lastName: value });
            onNameChange(value, 'last');
          }}
          disabled={licenseLoading || (hasVolunteer && !editingFields.lastName)}
        />

        {/* First name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          value={props.checkInData.firstName || ''}
          options={computedVolunteerOptions}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(vol) =>
            typeof vol === 'string' ? vol : vol.firstName
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.firstName}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="First Name"
              onChange={(e) => {
                props.onChange({
                  ...props.checkInData,
                  firstName:
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1),
                });
                onNameChange(e.target.value, 'first');
              }}
              error={!!props.errors?.firstName}
              helperText={props.errors?.firstName}
              InputProps={{
                ...params.InputProps,
                endAdornment: fieldEndAdornment(
                  'firstName',
                  params.InputProps.endAdornment
                ),
              }}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value, 'first');
            props.onChange({ ...props.checkInData, firstName: value });
          }}
          disabled={
            licenseLoading || (hasVolunteer && !editingFields.firstName)
          }
        />

        {/* Email */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          value={props.checkInData.email || ''}
          options={computedVolunteerOptions}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(vol) => (typeof vol === 'string' ? vol : vol.email)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.email}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email Address"
              onChange={(e) => {
                props.onChange({
                  ...props.checkInData,
                  email: e.target.value,
                });
              }}
              error={!!props.errors?.email}
              helperText={props.errors?.email}
              inputRef={emailRef}
              InputProps={{
                ...params.InputProps,
                endAdornment: fieldEndAdornment(
                  'email',
                  params.InputProps.endAdornment
                ),
              }}
            />
          )}
          onInputChange={(_, value) => {
            if (value) {
              props.onChange({ ...props.checkInData, email: value });
              onEmailChange(value);
              return;
            }
          }}
          disabled={licenseLoading || (hasVolunteer && !editingFields.email)}
        />

        {/* Phone Number */}
        <TextField
          sx={{ mt: 2 }}
          label="Phone Number"
          value={props.checkInData.phoneNumber || ''}
          onChange={(e) => {
            const formattedNumber = formatPhoneNumber(e.target.value);
            props.onChange({
              ...props.checkInData,
              phoneNumber: formattedNumber,
            });
          }}
          fullWidth
          error={!!props.errors?.phoneNumber}
          helperText={props.errors?.phoneNumber}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          disabled={
            licenseLoading || (hasVolunteer && !editingFields.phoneNumber)
          }
          InputProps={{
            endAdornment: fieldEndAdornment('phoneNumber'),
            sx: { paddingRight: '9px' },
          }}
        />

        {/* Address */}
        <TextField
          sx={{ mt: 2 }}
          label="Address"
          value={props.checkInData.address || ''}
          onChange={(e) => {
            props.onChange({ ...props.checkInData, address: e.target.value });
          }}
          error={!!props.errors?.address}
          helperText={props.errors?.address}
          fullWidth
          disabled={licenseLoading || (hasVolunteer && !editingFields.address)}
          InputProps={{
            endAdornment: fieldEndAdornment('address'),
            sx: { paddingRight: '9px' },
          }}
        />
      </Box>

      {/* Role */}
      <FormControl
        error={!!props.errors?.role}
        variant="standard"
        sx={{ py: 2 }}
        disabled={licenseLoading}
      >
        <FormLabel id="role-label">Volunteer Role:</FormLabel>
        <RadioGroup
          value={props.checkInData.role || null}
          onChange={(e) =>
            props.onChange({
              ...props.checkInData,
              role: e.target.value as Role,
            })
          }
          aria-labelledby="role-label"
        >
          {props.event.eventRoles.map((role, i) => (
            <FormControlLabel
              key={i}
              value={role}
              control={<Radio />}
              label={role}
            />
          ))}
        </RadioGroup>
        {props.errors?.role && (
          <FormHelperText>{props.errors?.role}</FormHelperText>
        )}
      </FormControl>

      {/* Organization */}
      <Autocomplete
        freeSolo
        autoComplete
        value={(props.checkInData.organization as OrganizationOption) || ''}
        options={props.organizations as OrganizationOption[]}
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
          <TextField {...params} label="Organization (optional)" />
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
                const newOrg = { ...value, _id: id };
                props.onChange({ ...props.checkInData, organization: newOrg });
              }
            });
            // if the user selected an existing organization, update it in state
          } else if (value) {
            props.onChange({ ...props.checkInData, organization: value });
          } else {
            props.onChange({
              ...props.checkInData,
              organization: undefined,
            });
          }
        }}
        disabled={licenseLoading}
      />
    </>
  );
}
