import OrganizationsView from '@/components/organizations/OrganizationList';
import { getAllOrganizations } from '@/server/actions/Organization';

// Just a list of all Organizations in the database
export default async function Page() {
  const all_orgs = await getAllOrganizations();
  return (
    <OrganizationsView organizationResponses={all_orgs} />
  );
}
