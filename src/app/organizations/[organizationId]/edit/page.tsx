import React from 'react';
import EditOrganizationView from '@/views/organizations/EditOrganizationView';
import { getOrganization } from '@/server/actions/Organization';

// Organization Props
interface EditOrganizationPageProps {
  params: { organizationId: string };
}
// Take Exisiting Organization Name using Id
const EditOrganizationPage: React.FC<EditOrganizationPageProps> = async (
  props
) => {
  const currentOrganization = JSON.parse(
    JSON.stringify(await getOrganization(props.params.organizationId))
  );
  return <EditOrganizationView currentOrganization={currentOrganization!} />;
};

export default EditOrganizationPage;
