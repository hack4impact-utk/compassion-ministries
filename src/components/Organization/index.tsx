'use client';
import React, { useState } from 'react';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Typography, Box, ListItemButton } from '@mui/material';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { useRouter } from 'next/navigation';
import { OrganizationReportResponse } from '@/server/actions/Reporting';
import LoadingButton from '../LoadingButton';
import OrganizationReporting from '../OrganizationReporting';

// Use OrganizationResponse Props
interface OrganizationProps {
  organization: OrganizationResponse;
  volunteers: VolunteerResponse[];
}

// OrganizationInfo displays organization information and volunteers who have attended an event by said organization
export default function Organization({
  organization,
  volunteers,
}: OrganizationProps): React.ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<OrganizationReportResponse | null>(null);

  async function onLoadReporting() {
    setLoading(true);
    const res = await fetch(`/api/organizations/${organization._id}/report`);
    const response = await res.json();

    setReport(response);

    setLoading(false);
  }
  return (
    <Box>
      <Typography variant="h3">{organization.name}</Typography>

      {/* Organization Reporting */}
      <Box sx={{ pt: 4 }}>
        {report?.numEvents ? (
          <OrganizationReporting report={report} />
        ) : (
          <LoadingButton
            loading={loading}
            buttonProps={{
              onClick: onLoadReporting,
              variant: 'contained',
              fullWidth: true,
            }}
          >
            View organization statistics
          </LoadingButton>
        )}
      </Box>

      <Typography
        sx={{ textDecoration: 'underline', fontWeight: 'bold' }}
        variant="h6"
        mt={4}
      >
        Volunteers
      </Typography>
      {volunteers.map((volunteer, index) => (
        <ListItemButton
          key={index}
          onClick={() => router.push(`/volunteers/${volunteer._id}`)}
          sx={{ pl: 0 }}
        >
          <Typography variant="h5">
            {volunteer.firstName} {volunteer.lastName}
          </Typography>
        </ListItemButton>
      ))}
    </Box>
  );
}
