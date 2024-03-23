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
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  volunteers: VolunteerResponse[];
  event: EventResponse;
  organizations: OrganizationResponse[];
  checkInData: CheckInFormData;
  onChange: (checkInData: CheckInFormData) => void;
  errors?: ValidationErrors<CheckInFormData>;
}

type OrganizationOption = OrganizationResponse & { display?: string };

const filter = createFilterOptions<OrganizationOption>();

async function createNewOrganization(name: string) {
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
    console.error('failed to create new organization: ', e);
  }
}

// TODO prevent input of role that the volunteer is not verified for
export default function CheckInForm(props: Props) {
  const [volunteerOptions, setVolunteerOptions] = useState<VolunteerResponse[]>(
    props.volunteers
  );

  // when the parent updates the volunteers it's passing in, update our state
  // TODO this can be removed once SSR provides props
  useEffect(() => setVolunteerOptions(props.volunteers), [props.volunteers]);

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
    } else {
      // if both name text boxes are cleared, it should go back to displaying all options
      if (!value && !props.checkInData.firstName) {
        setVolunteerOptions(props.volunteers);
        return;
      }

      const lastNameRegex = new RegExp(value, 'i');
      const firstNameRegex = new RegExp(props.checkInData.lastName, 'i');
      setVolunteerOptions(
        volunteerOptions.filter(
          (vol) =>
            firstNameRegex.test(vol.firstName) &&
            lastNameRegex.test(vol.lastName)
        )
      );
    }
  }

  function formatPhoneNumber(input: string) {
    input = input.replace(/\D/g, '');
    const size = input.length;
    if (size > 0) {
      input = '(' + input;
    }
    if (size > 3) {
      input = input.slice(0, 4) + ') ' + input.slice(4, 11);
    }
    if (size > 6) {
      input = input.slice(0, 9) + '-' + input.slice(9);
    }
    return input;
  }

  function onEmailChange(email: string) {
    const volunteerMatches = props.volunteers.filter(
      (vol) => vol.email === email
    );
    if (volunteerMatches.length === 1) {
      const match = volunteerMatches[0];
      const updatedFormData = {
        firstName: match.firstName,
        lastName: match.lastName,
        email: match.email,
        phoneNumber: formatPhoneNumber(match.phoneNumber),
        address: match.address,
        organization: match.previousOrganization,
      } as CheckInFormData;

      // ensure we only set the role if the event has it
      if (
        match.previousRole &&
        props?.event?.eventRoles.includes(match.previousRole)
      ) {
        updatedFormData.role = match.previousRole;
      }
      props.onChange(updatedFormData);
    }
  }

  return (
    <>
      <Box pt={2}>
        {/* Last name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          value={props.checkInData.lastName || ''}
          options={volunteerOptions}
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
                onNameChange(e.target.value, 'last');
                props.onChange({
                  ...props.checkInData,
                  lastName:
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1),
                });
              }}
              error={!!props.errors?.lastName}
              helperText={props.errors?.lastName}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value, 'last');
            props.onChange({ ...props.checkInData, lastName: value });
          }}
        />

        {/* First name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          value={props.checkInData.firstName || ''}
          options={volunteerOptions}
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
                onNameChange(e.target.value, 'first');
                props.onChange({
                  ...props.checkInData,
                  firstName:
                    e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1),
                });
              }}
              error={!!props.errors?.firstName}
              helperText={props.errors?.firstName}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value, 'first');
            props.onChange({ ...props.checkInData, firstName: value });
          }}
        />

        {/* Email */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          value={props.checkInData.email || ''}
          options={volunteerOptions}
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
            />
          )}
          onInputChange={(_, value) => {
            if (value) {
              props.onChange({ ...props.checkInData, email: value });
              onEmailChange(value);
              return;
            }
            props.onChange({} as CheckInFormData);
          }}
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
          error={!!props.errors?.phoneNumber}
          helperText={props.errors?.phoneNumber}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
        />
      </Box>

      {/* Role */}
      <FormControl
        error={!!props.errors?.role}
        variant="standard"
        sx={{ py: 2 }}
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

          // Checks if the inputValue match an existing organization
          const isExisting = options.some(
            (option) => inputValue === option.name
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
      />
    </>
  );
}
