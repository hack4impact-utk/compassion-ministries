import VolunteerList from '@/components/VolunteerList';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { Button, Link, Typography } from '@mui/material';

interface VolunteersViewProps {
  volunteers: VolunteerResponse[];
}

export default function VolunteersView({ volunteers }: VolunteersViewProps) {
  return (
    <>
      <Typography variant="h4" pt={2}>
        Volunteers
      </Typography>
      <Link href={'/volunteers/new'}>
        <Button variant="contained" sx={{ mt: 2 }} fullWidth>
          New Volunteer
        </Button>
      </Link>
      <VolunteerList volunteers={volunteers} />;
    </>
  );
}
