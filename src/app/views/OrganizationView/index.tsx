'use client';
import { OrganizationResponse } from '@/types/dataModel/organization';
import React from 'react';
import OrganizationInfo from '@/components/Organization';
import { getVolunteersByOrganization } from '@/server/actions/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';

interface OrganizationViewProps {
  organization: OrganizationResponse;
}

export async function OrganizationView({
  organization,
}: OrganizationViewProps) {
  // TODO: get volunteers from organization and pass them to the OrganizationList
  const volunteers: VolunteerResponse[] = await getVolunteersByOrganization(
    organization._id
  );
  return (
    <div>
      <h1>Organization</h1>
      <OrganizationInfo organization={organization} volunteers={volunteers} />
      <Button variant="contained">edit</Button>
    </div>
  );
}
