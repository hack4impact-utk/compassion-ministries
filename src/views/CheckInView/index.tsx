'use client';

import CheckInForm from '@/components/CheckInForm';
import type { EventResponse } from '@/types/dataModel/event';
import type { OrganizationResponse } from '@/types/dataModel/organization';
import type { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';
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

  const onCheckIn = () => {
    console.log(formData);
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
