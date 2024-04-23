import { z } from 'zod';
import zOrganization, { zOrganizationResponse } from './organization';
import zBase, { zObjectId } from './base';
import { zRole, zRoleVerification } from './roles';

export const backgroundCheckStatuses = [
  'Passed',
  'Failed',
  'In Progress',
] as const;
export const zBackgroundCheckStatus = z.enum(backgroundCheckStatuses);
export type BackgroundCheckStatus = z.infer<typeof zBackgroundCheckStatus>;

const zVolunteer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  previousRole: zRole.optional(),
  previousOrganization: zOrganization.optional(),
  backgroundCheck: z
    .object({
      status: zBackgroundCheckStatus,
      lastUpdated: z.date(),
    })
    .optional(),
  roleVerifications: z.array(zRoleVerification).optional(),
  softDelete: z.boolean(),
});

export const zVolunteerEntity = zVolunteer.extend({
  ...zBase.shape,
  previousOrganization: zObjectId.optional(),
});

export const zVolunteerResponse = zVolunteerEntity.extend({
  previousOrganization: zOrganizationResponse.optional(),
});

export const zUnpopulatedVolunteerResponse = zVolunteerEntity;

export const zCreateVolunteerRequest = zVolunteer.omit({
  roleVerifications: true,
  softDelete: true,
  backgroundCheck: true,
  previousOrganization: true,
  previousRole: true,
});

export const zUpdateVolunteerRequest = zVolunteer
  .extend({
    previousOrganization: zObjectId.optional(),
  })
  .omit({
    softDelete: true,
    backgroundCheck: true,
  })
  .partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface VolunteerEntity extends z.infer<typeof zVolunteerEntity> {}
export interface VolunteerResponse extends z.infer<typeof zVolunteerResponse> {}
export interface UnpopulatedVolunteerResponse
  extends z.infer<typeof zUnpopulatedVolunteerResponse> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}

export default zVolunteer;
