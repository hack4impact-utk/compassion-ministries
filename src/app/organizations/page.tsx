import { OrganizationsView } from '../views/OrganizationsView';
import { getAllOrganizations } from '@/server/actions/Organization';

// Just a list of all Organizations in the database
export default async function Page() {
  const all_orgs = await getAllOrganizations();
  return <OrganizationsView organizations={all_orgs} />;
}
