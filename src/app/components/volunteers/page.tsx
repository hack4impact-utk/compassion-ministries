import React from 'react';
import VolunteerInfo from './Volunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// define a volunteer of type VolunteerResponse
const volunteer: VolunteerResponse = {
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
  _id: 'volunteer_id_1',
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

export default function Page() {
  return (
    // call volunteerinfo component
    <div>
      <h1>Volunteers</h1>
      <p>
        <VolunteerInfo volunteer={volunteer} />
      </p>
    </div>
  );
}
