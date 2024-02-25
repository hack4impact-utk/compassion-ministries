import { OrganizationView } from '@/app/views/OrganizationView';
import { getOrganization } from '@/server/actions/Organization';

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const org = await getOrganization(params.organizationId);
  return org ? <OrganizationView organization={org} /> : null;
}
