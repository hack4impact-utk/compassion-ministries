import { EventResponse } from '@/types/dataModel/event';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { roles } from '@/types/dataModel/roles';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  volunteers: VolunteerResponse[];
  event: EventResponse;
  organizations: OrganizationResponse[];
  onChange: (checkInData: CheckInFormData) => void;
}

// TODO prevent input of role that the volunteer is not verified for
// TODO populate role, organization, and other data based on current email
export default function CheckInForm(props: Props) {
  const [volunteerOptions, setVolunteerOptions] = useState<VolunteerResponse[]>(
    props.volunteers
  );
  const [checkInData, setCheckInData] = useState<CheckInFormData>({});

  // when the parent updates the volunteers it's passing in, update our state
  useEffect(() => setVolunteerOptions(props.volunteers), [props.volunteers]);

  // when the user enters in a first/last name, filter the options of the first/last/email fields to match possible values
  function onNameChange(value: string, type: 'first' | 'last') {
    const filterOptions = volunteerOptions ?? props.volunteers;

    // if the name text box is cleared, it should go back to displaying all emails
    if (!value) {
      setVolunteerOptions(props.volunteers);
      return;
    }

    const regExp = new RegExp(value, 'gi');
    // narrow down available options for name/email based on name input
    if (type === 'first') {
      setVolunteerOptions(
        filterOptions.filter((vol) => regExp.test(vol.firstName))
      );
    } else {
      setVolunteerOptions(
        filterOptions.filter((vol) => regExp.test(vol.lastName))
      );
    }
  }

  // whenever any field changes, update the state in the component and pass it up to the parent
  function onPropertyChange(newCheckInData: CheckInFormData) {
    setCheckInData(newCheckInData);
    props.onChange(newCheckInData);
  }

  return (
    <>
      <Box pt={2}>
        {/* First name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
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
                onPropertyChange({ ...checkInData, firstName: e.target.value });
              }}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value, 'first');
            onPropertyChange({ ...checkInData, firstName: value });
          }}
        />

        {/* Last name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
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
                onPropertyChange({ ...checkInData, lastName: e.target.value });
              }}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value, 'last');
            onPropertyChange({ ...checkInData, lastName: value });
          }}
        />

        {/* Email */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
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
                onPropertyChange({ ...checkInData, email: e.target.value });
              }}
            />
          )}
          onInputChange={(_, value) => {
            onPropertyChange({ ...checkInData, email: value });
          }}
        />

        {/* Phone Number */}
        <TextField
          sx={{ mt: 2 }}
          label="Phone Number"
          onChange={(e) => {
            onPropertyChange({ ...checkInData, phoneNumber: e.target.value });
          }}
        />

        {/* Address */}
        <TextField
          sx={{ mt: 2 }}
          label="Address"
          onChange={(e) => {
            onPropertyChange({ ...checkInData, address: e.target.value });
          }}
        />
      </Box>

      {/* Role */}
      <Typography sx={{ fontWeight: 'bold' }} variant="h6" pt={2}>
        Volunteer Role:{' '}
      </Typography>
      <RadioGroup sx={{ pb: 2 }}>
        {roles.map((role, i) => (
          <FormControlLabel
            key={i}
            value={role}
            control={<Radio />}
            label={role}
          />
        ))}
      </RadioGroup>

      {/* Organization */}
      <Autocomplete
        freeSolo
        autoComplete
        options={props.organizations}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        getOptionLabel={(org) => (typeof org === 'string' ? org : org.name)}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Organization (optional)"
            onChange={(e) => {
              onPropertyChange({
                ...checkInData,
                organization: e.target.value,
              });
            }}
          />
        )}
        onInputChange={(_, value) => {
          onPropertyChange({ ...checkInData, organization: value });
        }}
      />
    </>
  );
}
