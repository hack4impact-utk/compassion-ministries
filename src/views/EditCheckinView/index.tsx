'use client';
import CheckInForm from '@/components/CheckInForm';
import LoadingButton from '@/components/LoadingButton';
import useSnackbar from '@/hooks/useSnackbar';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
import { ValidationErrors } from '@/utils/validation';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

interface EditCheckInViewProps {
  event: EventResponse;
  volunteers: VolunteerResponse[];
  organizations: OrganizationResponse[];
  eventVolunteer: EventVolunteerResponse;
}

export default function EditCheckInView(props: EditCheckInViewProps) {
  const [formData, setFormData] = useState<CheckInFormData>({
    role:
      props.event.eventRoles.length === 1 ? props.event.eventRoles[0] : null,
  } as CheckInFormData);
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<CheckInFormData> | undefined
  >(undefined);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  setLoading;
  setValidationErrors;

  // call the PUT API at src/app/api/events/check-in/[eventVolunteerId]
  const onEditCheckIn = async () => {
    try {
      const res = await fetch(
        `/api/events/check-in/${props.eventVolunteer._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.status !== 200) {
        showSnackbar('Failed to update checked in Volunteer', 'error');
        return;
      }

      // redirect to the event page
      window.location.href = `/events/${props.event._id}`;
      showSnackbar('Check in updated successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to update checked in Volunteer', 'error');
      setLoading(false);
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">
          Edit check in for {props.event.name}
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <CheckInForm
          checkInData={formData}
          onChange={(e) => {
            setFormData(e);
          }}
          event={props.event}
          volunteers={props.volunteers}
          organizations={props.organizations}
          errors={validationErrors}
          setSubmitDisabled={setSubmitDisabled}
        />
      </Grid2>
      <Grid2 xs={12}>
        <LoadingButton
          buttonProps={{
            variant: 'contained',
            fullWidth: true,
            onClick: onEditCheckIn,
            disabled: submitDisabled,
          }}
          loading={loading}
          loadingSize={24}
        >
          Update Check in
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
}
