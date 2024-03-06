'use client';
import SearchField from '@/components/SearchField';
import VolunteerList from '@/components/VolunteerList';
import useSearch from '@/hooks/useSearch';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Typography } from '@mui/material';

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
      <VolunteerList volunteers={volunteers} />;
    </>
  );
}
