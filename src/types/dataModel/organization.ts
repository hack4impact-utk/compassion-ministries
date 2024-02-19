import { z } from 'zod';
import zBase from './base';
import { ReactNode } from 'react';

const zOrganization = z.object({
  name: z.string(),
  softDelete: z.boolean(),
});

export const zOrganizationEntity = zOrganization.extend(zBase.shape);
export const zOrganizationResponse = zOrganizationEntity;
export const zCreateOrganizationRequest = zOrganization.omit({
  softDelete: true,
});
export const zUpdateOrganizationRequest = zCreateOrganizationRequest.partial();

export interface Organization extends z.infer<typeof zOrganization> {}
export interface OrganizationEntity
  extends z.infer<typeof zOrganizationEntity> {}
export interface OrganizationResponse
  extends z.infer<typeof zOrganizationResponse> {
    [x: string]: ReactNode | string | Date;
}
export interface CreateOrganizationRequest
  extends z.infer<typeof zCreateOrganizationRequest> {}
export interface UpdateOrganizationRequest
  extends z.infer<typeof zUpdateOrganizationRequest> {}

export default zOrganization;
