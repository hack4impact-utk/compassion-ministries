import { z } from 'zod';
import zBase from './base';

const zOrganization = z.object({
  name: z.string(),
  softDelete: z.boolean(),
});

export const zOrganizationResponse = zOrganization.extend(zBase.shape);
export const zCreateOrganizationRequest = zOrganization;

export interface Organization extends z.infer<typeof zOrganization> {}
export interface OrganizationResponse
  extends z.infer<typeof zOrganizationResponse> {}
export interface CreateOrganizationRequest
  extends z.infer<typeof zCreateOrganizationRequest> {}

export default zOrganization;
