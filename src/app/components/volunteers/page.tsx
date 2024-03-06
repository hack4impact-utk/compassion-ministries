import React from 'react';
import VolunteerInfo from './Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box } from '@mui/material';
import { getVolunteer } from '@/server/actions/Volunteer';

export default async function Page() {
  const res: VolunteerResponse = JSON.parse(
    JSON.stringify(await getVolunteer('65e896f17185c34ee75dddd5'))
  );

  return (
    <Box>
      <VolunteerInfo volunteer={res} />
    </Box>
  );
}
