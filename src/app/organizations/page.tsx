import OrganizationList from '@/components/organizations/OrganizationList';
import { getAllOrganizations } from '@/server/actions/Organizations';

// Just a list of all Organizations in the database
export default async function Page() {
  return (
    <OrganizationList organizationResponses={await getAllOrganizations()} />
  );
}
