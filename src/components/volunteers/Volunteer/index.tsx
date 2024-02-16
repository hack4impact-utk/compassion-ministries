import React from 'react';
import { VolunteerResponse } from '@/types/dataModel/volunteer';

// Use VolunteerResponse Props
interface VolunteerProps {
  volunteer: VolunteerResponse;
}

// VolunteerInfoComponent displays volunteer information
const VolunteerInfoComponent: React.FC<VolunteerProps> = ({ volunteer }) => {
  return (
    <div>
      <h1 style={{ fontSize: '2rem' }}>
        {volunteer.firstName} {volunteer.lastName}
      </h1>
      <p>
        <strong>Email:</strong> {volunteer.email}
      </p>
      <p>
        <strong>Phone number:</strong> {volunteer.phoneNumber}
      </p>
      <p>
        <strong>Address:</strong> {volunteer.address}
      </p>
      <p>
        <strong>Previous role:</strong> {volunteer.previousRole}
      </p>
      <p>
        <strong>Previous organization:</strong>{' '}
        {volunteer.previousOrganization?.name}
      </p>
      <h2>Role Verifications</h2>
      <ul>
        {volunteer.roleVerifications?.map((verification, index) => (
          <li key={index}>
            <p>
              <strong>Role:</strong> {verification.role}
            </p>
            <p>
              <strong>Verified by:</strong> {verification.verifier}
            </p>
            <p>
              <strong>Verification date:</strong>{' '}
              {new Date(verification.lastUpdated).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerInfoComponent;
