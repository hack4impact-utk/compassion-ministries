'use client';
import CheckInForm from '@/components/CheckInForm';
import LoadingButton from '@/components/LoadingButton';
import useSnackbar from '@/hooks/useSnackbar';
import useValidation from '@/hooks/useValidation';
import { EventResponse } from '@/types/dataModel/event';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { CheckInFormData, zCheckInFormData } from '@/types/forms/checkIn';
import { ValidationErrors } from '@/utils/validation';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useRoleConfirmation from '@/hooks/useRoleConfirmation';

interface EditCheckInViewProps {
  event: EventResponse;
  organizations: OrganizationResponse[];
  eventVolunteer: EventVolunteerResponse;
}

export default function EditCheckInView(props: EditCheckInViewProps) {
  const [formData, setFormData] = useState<CheckInFormData>({
    firstName: props.eventVolunteer.volunteer.firstName,
    lastName: props.eventVolunteer.volunteer.lastName,
    email: props.eventVolunteer.volunteer.email,
    phoneNumber: props.eventVolunteer.volunteer.phoneNumber,
    address: props.eventVolunteer.volunteer.address,
    volunteerId: props.eventVolunteer.volunteer._id,
    role: props.eventVolunteer.role,
    organization: props.eventVolunteer.organization,
  } as CheckInFormData);
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<CheckInFormData> | undefined
  >(undefined);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const validate = useValidation(zCheckInFormData);
  const router = useRouter();
  const confirmRole = useRoleConfirmation();

  const { showSnackbar } = useSnackbar();
  setLoading;
  setValidationErrors;

  // call the PUT API at src/app/api/events/check-in/[eventVolunteerId]
  const onEditCheckIn = async () => {
    setLoading(true);

    const validationResult = validate(formData);
    if (validationResult) {
      setValidationErrors(validationResult);
      setLoading(false);
      return;
    }

    setValidationErrors(undefined);

    let verifier: string | null = null;
    if (
      formData.role !== 'Food' &&
      formData.role !== props.eventVolunteer.role
    ) {
      verifier = await confirmRole(formData.role);
      // return if not confirmed
      if (!verifier) {
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(
        `/api/events/check-in/${props.eventVolunteer._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            organization: formData.organization?._id,
          }),
        }
      );
      if (res.status !== 204) {
        showSnackbar('Failed to update checked in Volunteer', 'error');
        return;
      }

      // redirect to the event page
      router.push(`/events/${props.event._id}`);
      router.refresh();
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
          volunteers={[]}
          organizations={props.organizations}
          errors={validationErrors}
          setSubmitDisabled={setSubmitDisabled}
          editCheckIn={true}
        />
      </Grid2>
      <Grid2 xs={12}>
        <LoadingButton
          variant="contained"
          fullWidth
          onClick={onEditCheckIn}
          disabled={submitDisabled}
          loading={loading}
          loadingSize={24}
        >
          Update Check in
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
}