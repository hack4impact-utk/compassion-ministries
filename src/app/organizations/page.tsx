import OrganizationList from '@/components/organizations/OrganizationList';
import { getAllOrganizations } from '@/server/actions/Organizations';

export default async function Page() {
  return (
    <OrganizationList organizationResponses={await getAllOrganizations()} />
  );
}
