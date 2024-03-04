import { OrganizationView } from '@/app/views/OrganizationView';
import { getOrganization } from '@/server/actions/Organization';
import { getVolunteersByOrganization } from '@/server/actions/Volunteer';

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const org = await getOrganization(params.organizationId);
  const vols = await getVolunteersByOrganization(params.organizationId);
  return <OrganizationView organization={org} volunteers={vols} />;
}
