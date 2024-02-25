import React from 'react';
import EditOrganizationView from '@/views/organizations/EditOrganizationView';
import { getOrganization } from '@/server/actions/Organization';

interface EditOrganizationPageProps {
  params: { organizationId: string };
}
const EditOrganizationPage: React.FC<EditOrganizationPageProps> = async (props) => {
  const currentOrganization = await getOrganization(props.params.organizationId);
  return (
    <div>
      <h1>Edit Organization Page</h1>
      <EditOrganizationView 
        currentOrganization={currentOrganization!}
      />
    </div>
  );
};

export default EditOrganizationPage;
