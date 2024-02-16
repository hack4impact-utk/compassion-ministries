// page that will eventually contain information about a single volunteer
// Page that will eventually contain a list of all volunteers
import VolunteerInfoComponent from '@/components/volunteers/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// test case to call VolunteerInfoComponent
const sampleVolunteer: VolunteerResponse = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  address: '123 Main St, Anytown, USA',
  softDelete: false,
  previousOrganization: {
    name: 'Previous Organization',
    softDelete: false,
    _id: 'organization_id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  _id: 'volunteer_id',
  createdAt: new Date(),
  updatedAt: new Date(),
  roleVerifications: [
    {
      role: 'Medical',
      verifier: 'Verifier 1',
      lastUpdated: new Date(),
    },
  ],
};

export default function VolunteerPage({
  params,
}: {
  params: { volunteerId: string };
}) {
  return (
    <h1>
      {' '}
      Volunteer Page {params.volunteerId}{' '}
      <VolunteerInfoComponent volunteer={sampleVolunteer} />{' '}
    </h1>
  );
}
