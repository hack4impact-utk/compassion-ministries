import { OrganizationView } from '@/app/views/OrganizationView';
import { getOrganization } from '@/server/actions/Organization';

export default async function Page({
  params,
}: {
  params: { organization: string };
}) {
  const orgs = await getOrganization(params.organization);
  return <OrganizationView organization={orgs} />;
}