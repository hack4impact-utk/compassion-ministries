'use client';
import LoadingButton from '@/components/LoadingButton';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { Box, List, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';

export default function VolunteerReporting() {
  const orgsPlaceholder: OrganizationResponse[] = [];
  const [reportingVisible, setReportingVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function onReportingClick() {
    setLoading(true);

    // get reporting info from db
    setLoading(false);
    setReportingVisible(true);
  }

  return (
    <>
      {!reportingVisible ? (
        <LoadingButton
          buttonProps={{ variant: 'contained', onClick: onReportingClick }}
          loading={loading}
        >
          Display Statistics
        </LoadingButton>
      ) : (
        <Box>
          <Typography>
            NAME has volunteered for a total of ### hours at ### events
          </Typography>
          <Typography>
            NAME has volunteered with the following organizations in the past
          </Typography>
          <List>
            {orgsPlaceholder.map((organization, i) => {
              // get all events with that org id, calculate their duration, and add them up
              const organizationName = '';
              const hoursWithOrganization = 10;
              return (
                <ListItemText
                  key={i}
                  primary={organizationName}
                  secondary={`${hoursWithOrganization} hours`}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
}
