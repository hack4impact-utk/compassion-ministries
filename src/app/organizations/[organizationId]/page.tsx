import Organization from '@/components/Organization';
import { OrganizationResponse } from '@/types/dataModel/organization';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

const testOrganization: OrganizationResponse = {
  _id: '5',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'This is a test organization! Yeet!',
  softDelete: false,
};

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
  previousOrganization: {
    _id: 'sdfsd',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Organization name!',
    softDelete: false,
  },
};

const volunteer2: VolunteerResponse = {
  _id: 'string1',
  address: 'test address',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'andrew@andrew.com',
  firstName: 'Zavier',
  lastName: 'Miller',
  phoneNumber: '848957395',
  softDelete: false,
  previousOrganization: {
    _id: 'sdfsd',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Organization name!',
    softDelete: false,
  },
};

export default function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  return (
    <>
      <h1> Organizations Page {params.organizationId}</h1>
      <Organization
        organization={testOrganization}
        volunteers={[volunteer1, volunteer2]}
      />
    </>
  );
}
