'use client';
import { EventResponse } from '@/types/dataModel/event';
import { EventFormData } from '@/types/forms/events';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { roles } from '@/types/dataModel/roles';
import dayjs from 'dayjs';
import { ValidationErrors } from '@/utils/validation';
import { dateToTimeStr } from '@/utils/dates';

interface EventFormProps {
  onChange: (eventData: EventFormData) => void;
  eventData: EventFormData;
  currentEvent?: EventResponse;
  errors?: ValidationErrors<EventFormData>;
}

export default function EventForm({
  onChange,
  eventData,
  currentEvent,
  errors,
}: EventFormProps) {
  useEffect(() => {
    if (currentEvent) {
      onChange({
        name: currentEvent.name,
        description: currentEvent.description,
        eventLocation: currentEvent.eventLocation,
        startAt: dateToTimeStr(currentEvent.startAt),
        endAt: dateToTimeStr(currentEvent.endAt),
        date: dayjs(currentEvent.date),
        eventRoles: currentEvent.eventRoles,
      });
    }
  }, [currentEvent, onChange]);

  return (
    <Box sx={{ pt: 2 }}>
      <TextField
        label="Event name"
        value={eventData.name || ''}
        onChange={(e) => onChange({ ...eventData, name: e.target.value })}
        fullWidth
        error={!!errors?.name}
        helperText={errors?.name}
      />
      <TextField
        label="Description"
        value={eventData.description || ''}
        onChange={(e) =>
          onChange({ ...eventData, description: e.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
        error={!!errors?.description}
        helperText={errors?.description}
      />
      <TextField
        label="Location"
        value={eventData.eventLocation || ''}
        onChange={(e) =>
          onChange({ ...eventData, eventLocation: e.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
        error={!!errors?.eventLocation}
        helperText={errors?.eventLocation}
      />
      <Grid2 container>
        <TextField
          label="Start at"
          type="time"
          value={eventData.startAt || ''}
          inputProps={{ max: eventData.endAt || undefined }}
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => {
            if (!e.target.value) return;
            onChange({
              ...eventData,
              startAt: e.target.value,
            });
          }}
          error={!!errors?.startAt}
          helperText={errors?.startAt}
        />
        <TextField
          label="End at"
          type="time"
          value={eventData.endAt || ''}
          inputProps={{ min: '12:00' }}
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => {
            if (!e.target.value) return;
            onChange({
              ...eventData,
              endAt: e.target.value,
            });
          }}
          error={!!errors?.endAt}
          helperText={errors?.endAt}
        />
      </Grid2>
      <DatePicker
        label="Date"
        value={eventData.date || null}
        minDate={dayjs()}
        onChange={(date) => {
          if (!date) return; // TODO: error handle
          onChange({ ...eventData, date });
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors?.date,
            helperText: errors?.date,
          },
        }}
        sx={{ mt: 2 }}
      />
      <FormControl
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
        error={!!errors?.eventRoles}
      >
        <FormLabel component="legend">
          What services will be offered at this event?
        </FormLabel>
        <FormGroup>
          {roles.map((role) => (
            <FormControlLabel
              key={role}
              label={role}
              control={
                <Checkbox
                  checked={eventData.eventRoles?.includes(role) || false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!eventData.eventRoles) {
                        onChange({ ...eventData, eventRoles: [role] });
                        return;
                      }
                      onChange({
                        ...eventData,
                        eventRoles: [...eventData.eventRoles, role],
                      });
                    } else {
                      onChange({
                        ...eventData,
                        eventRoles: eventData.eventRoles.filter(
                          (r) => r !== role
                        ),
                      });
                    }
                  }}
                />
              }
            />
          ))}
          {errors?.eventRoles && (
            <FormHelperText>{errors?.eventRoles}</FormHelperText>
          )}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
