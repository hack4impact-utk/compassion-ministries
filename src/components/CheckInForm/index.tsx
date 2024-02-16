import { EventResponse } from '@/types/dataModel/event';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { roles } from '@/types/dataModel/roles';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
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
  onChange: (checkinReq: CreateEventVolunteerRequest) => void;
}

// TODO prevent input of role that the volunteer is not verified for
// TODO populate role and organization option based on current email
export default function CheckInForm(props: Props) {
  const [volunteerOptions, setVolunteerOptions] = useState<VolunteerResponse[]>(
    props.volunteers
  );

  // when the parent updates the volunteers it's passing in, update our state
  useEffect(() => setVolunteerOptions(props.volunteers), [props.volunteers]);

  // when the user enters in a first/last name, filter the options of the other fields to match possible values
  function onNameChange(value: string) {
    const filterOptions = volunteerOptions ?? props.volunteers;

    // if the name text box is cleared, it should go back to displaying all emails
    if (!value) {
      setVolunteerOptions(props.volunteers);
      return;
    }

    // narrow down available options for name/email based on name input
    const regExp = new RegExp(value, 'gi');
    setVolunteerOptions(
      filterOptions.filter((vol) =>
        regExp.test(vol.firstName + ' ' + vol.lastName)
      )
    );
  }

  return (
    <>
      <Box pt={2}>
        {/* Name */}
        <Autocomplete
          sx={{ mt: 2 }}
          freeSolo
          autoComplete
          options={volunteerOptions}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(vol) =>
            typeof vol === 'string' ? vol : vol.firstName + ' ' + vol.lastName
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.firstName + ' ' + option.lastName}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Name"
              onChange={(e) => onNameChange(e.target.value)}
            />
          )}
          onInputChange={(_, value) => {
            onNameChange(value);
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
            <TextField {...params} label="Email Address" />
          )}
        />

        {/* Address */}
        <TextField sx={{ mt: 2 }} label="Address" />
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
          <TextField {...params} label="Organization (optional)" />
        )}
      />
    </>
  );
}
