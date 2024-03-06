'use client';
import SearchField from '@/components/SearchField';
import VolunteerList from '@/components/VolunteerList';
import useSearch from '@/hooks/useSearch';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button, Link, Typography } from '@mui/material';

interface VolunteersViewProps {
  volunteers: VolunteerResponse[];
}

export default function VolunteersView({ volunteers }: VolunteersViewProps) {
  const search = useSearch();

  if (search.length > 0) {
    volunteers = volunteers.filter((volunteer) =>
      `${volunteer.firstName} ${volunteer.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return (
    <>
      <SearchField />
      <Typography variant="h4" pt={2}>
        Volunteers
      </Typography>
      <Link href={'/volunteers/new'}>
        <Button variant="contained" sx={{ mt: 2 }} fullWidth>
          New Volunteer
        </Button>
      </Link>
      <VolunteerList volunteers={volunteers} />
    </>
  );
}
