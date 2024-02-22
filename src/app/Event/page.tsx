import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { EventResponse } from '@/types/dataModel/event';
import Event from '../../components/Event';

const sampleEvent: EventResponse = {
  name: 'Union County Health Fair',
  description: 'Health fair for the community.',
  eventLocation: 'Cornerstone Church, Farragut, TN',
  startAt: new Date(),
  endAt: new Date(),
  date: new Date(),
  eventRoles: ['Medical', 'Save the Babies', 'Dental'],
  isRecurring: false,
  parentEvent: 'parent_event_id',
  _id: 'event_id',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const sampleVolunteers: VolunteerResponse[] = [
  {
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
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '987-654-3210',
    address: '456 Oak St, Othertown, USA',
    softDelete: false,
    previousOrganization: {
      name: 'Another Organization',
      softDelete: false,
      _id: 'another_organization_id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    _id: 'volunteer_id_2',
    createdAt: new Date(),
    updatedAt: new Date(),
    roleVerifications: [
      {
        role: 'Medical',
        verifier: 'Verifier 3',
        lastUpdated: new Date(),
      },
      {
        role: 'Dental',
        verifier: 'Verifier 4',
        lastUpdated: new Date(),
      },
      {
        role: 'Save the Babies',
        verifier: 'Verifier 5',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '555-123-4567',
    address: '789 Elm St, Newcity, USA',
    softDelete: false,
    previousOrganization: {
      name: 'Yet Another Organization',
      softDelete: false,
      _id: 'yet_another_organization_id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    _id: 'volunteer_id_3',
    createdAt: new Date(),
    updatedAt: new Date(),
    roleVerifications: [
      {
        role: 'Dental',
        verifier: 'Verifier 3',
        lastUpdated: new Date(),
      },
      {
        role: 'Medical',
        verifier: 'Verifier 4',
        lastUpdated: new Date(),
      },
      {
        role: 'Save the Babies',
        verifier: 'Verifier 5',
        lastUpdated: new Date(),
      },
    ],
  },
];

// call the EventComponent with the sampleEvent and sampleVolunteers
export default function Page() {
  return (
    <div>
      <Event event={sampleEvent} volunteers={sampleVolunteers} />
    </div>
  );
}
