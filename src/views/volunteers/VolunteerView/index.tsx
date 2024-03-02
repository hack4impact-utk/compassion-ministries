'use client';
import Volunteer from '@/components/volunteers/Volunteer';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box, Button, Link } from '@mui/material';

export default function VolunteerView({
  volunteer,
  events,
}: {
  volunteer: VolunteerResponse;
  events: VolunteerEventResponse[];
}) {
  const onDelete = async () => {
    await fetch(`/api/volunteers/${volunteer._id}`, { method: 'DELETE' });
  };
  return (
    <>
      <Volunteer volunteer={volunteer} events={events} />
      <Box sx={{ display: 'flex', pt: 2 }}>
        <Button variant="contained" sx={{ mr: 1 }}>
          <Link
            href={`/volunteers/${volunteer._id}/edit`}
            color="inherit"
            sx={{ textDecoration: 'none' }}
          >
            Edit
          </Link>
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </>
  );
}
