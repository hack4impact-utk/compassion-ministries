// 'use client';
// import CheckInForm from '@/components/CheckInForm';
// import { EventResponse } from '@/types/dataModel/event';
// import { OrganizationResponse } from '@/types/dataModel/organization';
// import { VolunteerResponse } from '@/types/dataModel/volunteer';
// import { CheckInFormData } from '@/types/forms/checkIn';
// import { useEffect, useState } from 'react';

// const event: EventResponse = {
//   name: 'Test event',
//   startAt: new Date('2020-11-14T23:02:00.000Z'),
//   endAt: new Date('2020-11-14T23:02:00.000Z'),
//   eventRoles: ['Food', 'Medical'],
//   emailBodies: [],
//   isRecurring: false,
//   parentEvent: '',
//   _id: '',
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// export default function Home() {
//   const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([]);
//   const [organizations, setOrganizations] = useState<OrganizationResponse[]>(
//     []
//   );
//   const [checkInData, setCheckInData] = useState<CheckInFormData>(
//     {} as CheckInFormData
//   );

//   useEffect(() => {
//     async function dbCall() {
//       const res = await fetch('/api/volunteers');
//       const volunteers: VolunteerResponse[] = await res.json();
//       const res2 = await fetch('/api/organizations');
//       const organizations: OrganizationResponse[] = await res2.json();
//       setVolunteers(volunteers);
//       setOrganizations(organizations);
//     }
//     dbCall();
//   }, []);

//   return (
//     <CheckInForm
//       volunteers={volunteers}
//       event={event}
//       organizations={organizations}
//       onChange={setCheckInData}
//       checkInData={checkInData}
//     />
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import RoleVerificationForm from '@/components/RoleVerificationForm';
import { RoleVerification } from '@/types/dataModel/roles';
import { UpsertRoleVerificationFormData } from '@/types/forms/role-verifications';

const currentVerification: RoleVerification = {
  verifier: 'John Doe',
  role: 'Dental',
  lastUpdated: new Date(),
};

export default function Home() {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([]);
  console.log(volunteers);

  const [roleVerificationData, setRoleVerificationData] =
    useState<UpsertRoleVerificationFormData>(
      {} as UpsertRoleVerificationFormData
    );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/volunteers');
      const volunteers: VolunteerResponse[] = await res.json();
      setVolunteers(volunteers);
    }

    fetchData();
  }, []);

  return (
    <div>
      <RoleVerificationForm
        roleVerificationData={roleVerificationData}
        onChange={(verification) => setRoleVerificationData(verification)}
        currentVerification={currentVerification}
      />
    </div>
  );
}
