'use client';

import CheckInForm from '@/components/CheckInForm';
import useRoleConfirmation from '@/hooks/useRoleConfirmation';
import type { EventResponse } from '@/types/dataModel/event';
import type { OrganizationResponse } from '@/types/dataModel/organization';
import type {
  CreateVolunteerRequest,
  VolunteerResponse,
} from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
import { transformCheckInFormDataToCreateEventVolunteerRequest } from '@/utils/transformers/check-in';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
  const confirm = useRoleConfirmation();

  const onCheckIn = async () => {
    // find volunteer by email or set volunteer to new volunteer req
    const foundVolunteer = props.volunteers.find(
      (v) => v.email === formData.email
    );
    const volunteer: string | CreateVolunteerRequest = props.volunteers.find(
      (v) => v.email === formData.email
    )?._id ?? {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };

    // TODO: make this work when there is a new volunteer
    if (
      typeof volunteer === 'string' &&
      formData.role !== 'Food' &&
      !foundVolunteer?.roleVerifications?.find(
        (rv) => rv.role === formData.role
      )
    ) {
      const verifier = await confirm(formData.role);
      if (!verifier) {
        return;
      }
      try {
        const res = await fetch(`/api/volunteers/${volunteer}/verifications`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: formData.role,
            verifier,
          }),
        });

        if (res.status !== 204) {
          console.error('failed to verify volunteer');
          return;
        }
      } catch (e) {
        console.error('failed to verify volunteer', e);
        return;
      }
    }

    const eventVolReq = transformCheckInFormDataToCreateEventVolunteerRequest(
      formData,
      volunteer,
      props.event
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

      if (res.status === 201) {
        // TODO: validate response and show success message

        // reset form
        setFormData({} as CheckInFormData);
      } else {
        const data = await res.json();
        console.error('failed to check in', data);
      }
    } catch (e) {
      console.error('failed to check in', e);
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
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onCheckIn}
        >
          Check in
        </Button>
      </Grid2>
    </Grid2>
  );
}
