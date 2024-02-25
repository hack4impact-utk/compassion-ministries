import { getOrganization } from '@/server/actions/Organization';
import OrganizationView from '../views/Organization/OrganizationView';

export default async function Page({
  params,
}: {
  params: { organization: string };
}) {
  const orgs = await getOrganization(params.organization);
  return <OrganizationView organization={orgs} />;
}
