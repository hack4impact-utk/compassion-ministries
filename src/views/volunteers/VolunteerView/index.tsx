'use client';
import Volunteer from '@/components/volunteers/Volunteer';
import useSnackbar from '@/hooks/useSnackbar';
import { VolunteerEventResponse } from '@/types/dataModel/eventVolunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VolunteerView({
  volunteer,
  events,
}: {
  volunteer: VolunteerResponse;
  events: VolunteerEventResponse[];
}) {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const onDelete = async () => {
    try {
      const res = await fetch(`/api/volunteers/${volunteer._id}`, {
        method: 'DELETE',
      });

      if (res.status !== 204) {
        const data = await res.json();
        showSnackbar(data.message, 'error');
        return;
      }

      router.push('/volunteers');
      router.refresh();
      showSnackbar('Volunteer deleted successfully', 'success');
    } catch (e) {
      showSnackbar('Failed to delete volunteer', 'error');
      console.error(e);
    }
  };
  return (
    <>
      <Volunteer volunteer={volunteer} events={events} />
      <Box sx={{ display: 'flex', pt: 2 }}>
        <Link href={`/volunteers/${volunteer._id}/edit`}>
          <Button variant="contained" sx={{ mr: 1 }}>
            Edit
          </Button>
        </Link>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </>
  );
}
