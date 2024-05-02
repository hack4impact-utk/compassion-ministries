'use client';
import { EventResponse } from '@/types/dataModel/event';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Role } from '@/types/dataModel/roles';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
import { ValidationErrors } from '@/utils/validation';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  LinearProgress,
  Button,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { formatPhoneNumber } from '@/utils/phone-number';
import { capitalizeString, capitalizeWords } from '@/utils/string';
import { removeDuplicatesAndSortByPath } from '@/utils/sorting';
import OrganizationAutocomplete from './OrganizationAutocomplete';
import useLicenseScanner from '@/hooks/useLicenseScanner';
import EditableTextField from '../EditableTextField';
import EditableAutocomplete from '../EditableAutocomplete';
import useEditableFields from '@/hooks/useEditableFields';

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
  onChange: Dispatch<SetStateAction<CheckInFormData>>;
  errors?: ValidationErrors<CheckInFormData>;
  setSubmitDisabled?: (disabled: boolean) => void;
}

// TODO prevent input of role that the volunteer is not verified for
export default function CheckInForm(props: Props) {
  const emailRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const hasVolunteer = useMemo(() => {
    return !!props.checkInData.volunteerId;
  }, [props.checkInData.volunteerId]);
  const inFamilyMode = useMemo(() => {
    return (
      !!props.checkInData.email &&
      !!props.checkInData.phoneNumber &&
      !!props.checkInData.address
    );
  }, [
    props.checkInData.email,
    props.checkInData.phoneNumber,
    props.checkInData.address,
  ]);

  const volunteerOptions = useMemo(() => {
    // filter based on the currently tracked first, last, and email
    // fields
    const filtered = props.volunteers.filter((vol) => {
      return (
        (!props.checkInData.firstName ||
          vol.firstName.toLowerCase() ===
            props.checkInData.firstName?.toLowerCase()) &&
        (!props.checkInData.lastName ||
          vol.lastName.toLowerCase() ===
            props.checkInData.lastName?.toLowerCase()) &&
        (!props.checkInData.email ||
          vol.email.toLowerCase() === props.checkInData.email?.toLowerCase())
      );
    });

    // if we have no matches and we are not in family mode, return all volunteers
    // TODO: this has a slight bug where filling out the first name with something new then
    //       the last name shows all options (it shouldnt). idk how to fix that rn
    if (filtered.length === 0 && !inFamilyMode) {
      return props.volunteers;
    }
    return filtered;
  }, [
    props.volunteers,
    props.checkInData.firstName,
    props.checkInData.lastName,
    props.checkInData.email,
    inFamilyMode,
  ]);
  const { isEditingAny } = useEditableFields();

  // keep submit button state synced with editing state
  useEffect(() => {
    props.setSubmitDisabled?.(isEditingAny);
  }, [isEditingAny, props.setSubmitDisabled]);

  const barcodeHandler = (e: any) => {
    props.setSubmitDisabled?.(false);

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
  };
  const barcodeStartHandler = () => {
    props.setSubmitDisabled?.(true);
  };
  const { licenseLoading } = useLicenseScanner(barcodeHandler, {
    barcodeStartHandler,
    strokeInterval: 200,
  });

  function handleChange(name: string, value?: string) {
    props.onChange((currData) => ({
      ...currData,
      [name]: value,
    }));
  }

  // when the user enters in a first/last name, filter the options of the first/last/email fields to match possible values
  function handleNameSelected(value: string, type: 'first' | 'last') {
    // narrow down available options for name/email based on name input
    if (type === 'first') {
      // autofill if there is a last name, and the form is not already filled
      if (
        value &&
        props.checkInData.lastName &&
        !hasVolunteer &&
        inFamilyMode
      ) {
        autofill({
          firstName: value,
          lastName: props.checkInData.lastName,
          email: props.checkInData.email || '',
        });
      } else {
        handleChange('firstName', value);
      }
    } else {
      if (
        value &&
        props.checkInData.firstName &&
        !hasVolunteer &&
        inFamilyMode
      ) {
        autofill({
          firstName: props.checkInData.firstName,
          lastName: value,
          email: props.checkInData.email || '',
        });
      } else {
        handleChange('lastName', value);
      }
    }
  }

  function handleEmailSelected(email: string | null) {
    // if no value, clear the form
    if (!email) {
      return;
    }

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
      props.onChange((currData) => {
        const updatedFormData: CheckInFormData = {
          ...currData,
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

        return updatedFormData;
      });
      return true;
    } else {
      // if we have multiple matches or no matches, just fill the search into the form

      props.onChange((currData) => ({
        ...currData,
        ...search,
      }));

      return false;
    }
  }

  function clearForm() {
    props.onChange({
      role:
        props.event.eventRoles.length === 1 ? props.event.eventRoles[0] : null,
    } as CheckInFormData);
  }

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
        <EditableAutocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          autoHighlight
          value={props.checkInData.lastName || ''}
          name="lastName"
          options={removeDuplicatesAndSortByPath<VolunteerResponse>(
            volunteerOptions,
            'lastName'
          )}
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
              error={!!props.errors?.lastName}
              helperText={props.errors?.lastName}
            />
          )}
          onInputChange={(_, value) => {
            handleChange('lastName', capitalizeString(value));
          }}
          onChange={(_, value) => {
            if (value === null) {
              handleChange('lastName', undefined);
            } else if (typeof value !== 'string' && !(value instanceof Array)) {
              handleNameSelected(value.lastName, 'last');
            }
          }}
          disabled={licenseLoading}
          requireEditing={hasVolunteer}
        />

        {/* First name */}
        <EditableAutocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoHighlight
          value={props.checkInData.firstName || ''}
          name="firstName"
          options={removeDuplicatesAndSortByPath<VolunteerResponse>(
            volunteerOptions,
            'firstName'
          )}
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
              error={!!props.errors?.firstName}
              helperText={props.errors?.firstName}
            />
          )}
          onInputChange={(_, value) => {
            handleChange('firstName', capitalizeString(value));
          }}
          onChange={(_, value) => {
            if (value === null) {
              handleChange('firstName', undefined);
            } else if (typeof value !== 'string' && !(value instanceof Array)) {
              handleNameSelected(value.firstName, 'first');
            }
          }}
          disabled={licenseLoading}
          requireEditing={hasVolunteer}
        />

        {/* Email */}
        <EditableAutocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          autoHighlight
          value={props.checkInData.email || ''}
          name="email"
          options={removeDuplicatesAndSortByPath<VolunteerResponse>(
            volunteerOptions,
            'email'
          )}
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
              error={!!props.errors?.email}
              helperText={props.errors?.email}
              inputRef={emailRef}
            />
          )}
          onInputChange={(_, value) => {
            handleChange('email', value);
          }}
          onChange={(_, value) => {
            if (typeof value !== 'string' && !(value instanceof Array)) {
              handleEmailSelected(value?.email || null);
            }
          }}
          disabled={licenseLoading}
          requireEditing={hasVolunteer}
        />

        {/* Phone Number */}
        <EditableTextField
          sx={{ mt: 2 }}
          label="Phone Number"
          name="phoneNumber"
          value={props.checkInData.phoneNumber || ''}
          onChange={(e) => {
            const formattedNumber = formatPhoneNumber(e.target.value);
            handleChange('phoneNumber', formattedNumber);
          }}
          fullWidth
          error={!!props.errors?.phoneNumber}
          helperText={props.errors?.phoneNumber}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          disabled={licenseLoading}
          InputProps={{
            sx: { paddingRight: '9px' },
          }}
          requireEditing={hasVolunteer}
        />

        {/* Address */}
        <EditableTextField
          sx={{ mt: 2 }}
          label="Address"
          name="address"
          value={props.checkInData.address || ''}
          onChange={(e) => {
            handleChange('address', e.target.value);
          }}
          error={!!props.errors?.address}
          helperText={props.errors?.address}
          fullWidth
          disabled={licenseLoading}
          InputProps={{
            sx: { paddingRight: '9px' },
          }}
          requireEditing={hasVolunteer}
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
          name="role"
          onChange={(e) => handleChange('role', e.target.value as Role)}
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
      <OrganizationAutocomplete
        value={props.checkInData.organization}
        options={props.organizations}
        disabled={licenseLoading}
        onChange={(org) =>
          props.onChange((currData) => ({
            ...currData,
            organization: org,
          }))
        }
        setSubmitDisabled={props.setSubmitDisabled}
      />
    </>
  );
}
