import {
  OrganizationView,
  OrganizationViewProps,
} from '@/views/OrganizationView';
import { getOrganization } from '@/server/actions/Organization';
import { getVolunteersByOrganization } from '@/server/actions/Volunteer';
import { OrganizationResponse } from '@/types/dataModel/organization';

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  let org: OrganizationResponse;
  try {
    org = await getOrganization(params.organizationId);
  } catch (e) {
    return <h1>Organization not found</h1>;
  }
  const vols = await getVolunteersByOrganization(params.organizationId);
  const organizationProps: OrganizationViewProps = {
    organization: org,
    volunteers: vols,
  };
  return <OrganizationView {...organizationProps} />;
}
