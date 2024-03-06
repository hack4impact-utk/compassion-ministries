import VolunteerList from '@/components/VolunteerList';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Typography } from '@mui/material';

interface VolunteersViewProps {
  volunteers: VolunteerResponse[];
}

export default function VolunteersView({ volunteers }: VolunteersViewProps) {
  return (
    <>
      <Typography variant="h4" pt={2}>
        Volunteers
      </Typography>
      <VolunteerList volunteers={volunteers} />;
    </>
  );
}
