'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationInfo from '@/components/Organization';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';

interface OrganizationViewProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

export function OrganizationView({
  organization,
  volunteers,
}: OrganizationViewProps) {
  return (
    <div>
      {/* Display organization information */}
      <OrganizationInfo organization={organization} volunteers={volunteers} />

      {/* Button for editing organization */}
      <Button variant="contained">edit</Button>
    </div>
  );
}
