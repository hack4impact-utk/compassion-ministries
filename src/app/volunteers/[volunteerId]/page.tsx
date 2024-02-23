// page that will eventually contain information about a single volunteer

import Volunteer from '@/components/volunteers/Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

const volunteer1: VolunteerResponse = {
  _id: 'string1',
  address: 'test address',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'andrew@andrew.com',
  firstName: 'Andrew',
  lastName: 'Rutter',
  phoneNumber: '848957395',
  softDelete: false,
  roleVerifications: [
    {
      role: 'Dental',
      verifier: 'John',
      lastUpdated: new Date(),
    },
    {
      role: 'Medical',
      verifier: 'John',
      lastUpdated: new Date(),
    },
  ],
  previousOrganization: {
    _id: 'sdfsd',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Organization name!',
    softDelete: false,
  },
};

export default function VolunteerPage({
  params,
}: {
  params: { volunteerId: string };
}) {
  return (
    <>
      <h1> Volunteer Page {params.volunteerId} </h1>;
      <Volunteer volunteer={volunteer1} />
    </>
  );
}
