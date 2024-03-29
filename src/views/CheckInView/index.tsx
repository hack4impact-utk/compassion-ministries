'use client';
import CheckInForm from '@/components/CheckInForm';
import LoadingButton from '@/components/LoadingButton';
// import useRoleConfirmation from '@/hooks/useRoleConfirmation'; UNCOMMENT AFTER FIELD TEST
import useSnackbar from '@/hooks/useSnackbar';
import useValidation from '@/hooks/useValidation';
import type { EventResponse } from '@/types/dataModel/event';
import type { OrganizationResponse } from '@/types/dataModel/organization';
import type {
  CreateVolunteerRequest,
  VolunteerResponse,
} from '@/types/dataModel/volunteer';
import { CheckInFormData, zCheckInFormData } from '@/types/forms/checkIn';
import { transformCheckInFormDataToCreateEventVolunteerRequest } from '@/utils/transformers/check-in';
import { ValidationErrors } from '@/utils/validation';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CheckInViewProps {
  event: EventResponse;
  volunteers: VolunteerResponse[];
  organizations: OrganizationResponse[];
}

export default function CheckInView(props: CheckInViewProps) {
  const [formData, setFormData] = useState<CheckInFormData>(
    {} as CheckInFormData
  );
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<CheckInFormData> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // const confirmRole = useRoleConfirmation(); UNCOMMENT AFTER FIELD TEST
  const { showSnackbar } = useSnackbar();
  const validate = useValidation(zCheckInFormData);
  const router = useRouter();

  const onCheckIn = async () => {
    setLoading(true);
    // Validate the form
    const validationResult = validate(formData);
    if (validationResult) {
      setValidationErrors(validationResult);
      setLoading(false);
      return;
    }

    // Clear validation errors
    setValidationErrors(undefined);

    // find volunteer by email or set volunteer to new volunteer req
    const foundVolunteer = props.volunteers.find(
      (v) => v.email === formData.email
    );
    const volunteer: string | CreateVolunteerRequest = foundVolunteer?._id ?? {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
      address: formData.address,
    };

    /* UNCOMMENT AFTER FIELD TEST
    let verifier: string | null = null;

    // if:
    // - role is not food
    // - volunteer is an object (new volunteer)
    // - or volunteer does not have a role verification for the role
    // then confirm the role
    if (
      formData.role !== 'Food' &&
      (typeof volunteer === 'object' ||
        !foundVolunteer?.roleVerifications?.find(
          (rv) => rv.role === formData.role
        ))
    ) {
      verifier = await confirmRole(formData.role);
      // return if not confirmed
      if (!verifier) {
        setLoading(false);
        return;
      }
    }
    */

    const eventVolReq = transformCheckInFormDataToCreateEventVolunteerRequest(
      formData,
      volunteer,
      props.event,
      undefined // change to `verifier || undefined`
    );

    // make post req
    try {
      const res = await fetch(`/api/events/${props.event._id}/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventVolReq),
      });

      if (res.status !== 201) {
        // handle duplicate entry, we don't want to display duplicate message
        // to the user
        if (res.status === 409) {
          setFormData({} as CheckInFormData);
          showSnackbar('Volunteer already checked in', 'error');
          setLoading(false);
          return;
        }
        const data = await res.json();
        showSnackbar(data.message, 'error');
        setLoading(false);
        return;
      }
      // reset form
      setFormData({} as CheckInFormData);
      showSnackbar('Checked in successfully', 'success');
      router.refresh();
      setLoading(false);
    } catch (e) {
      showSnackbar('Failed to check in', 'error');
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">Check in for {props.event.name}</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <CheckInForm
          checkInData={formData}
          onChange={setFormData}
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
            onClick: onCheckIn,
            disabled: submitDisabled,
          }}
          loading={loading}
          loadingSize={24}
        >
          Check in
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
}
