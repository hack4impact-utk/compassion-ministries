'use client';
import {useState} from 'react';
import LoadingButton from '@/components/LoadingButton';
import Volunteer from '@/components/volunteers/Volunteer';
import useDeleteConfirmation from '@/hooks/useDeleteConfirmation';
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
  const confirmDelete = useDeleteConfirmation({
    resourceName: 'volunteer',
    confirmationKeyword: `${volunteer.firstName} ${volunteer.lastName}`,
  });
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    try {
      if (!(await confirmDelete())) {
        return;
      }
      setIsLoading(true);
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
    } finally{
      setIsLoading(false);
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
        <LoadingButton 
          loading={isLoading} 
          onClick={onDelete} 
          variant="contained" 
          color="error">
          Delete
        </LoadingButton>
      </Box>
    </>
  );
}
