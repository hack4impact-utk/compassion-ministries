import { z } from 'zod';
import zOrganization, { zOrganizationResponse } from './organization';
import zBase, { zObjectId } from './base';

export const verifiedRoles = ['Medical', 'Dental', 'Save the Babies'] as const;
export const zVerifiedRole = z.enum(verifiedRoles);
export type VerifiedRole = z.infer<typeof zVerifiedRole>;

export const roles = ['Food', ...verifiedRoles] as const;
export const zRole = z.enum(roles);
export type Role = z.infer<typeof zRole>;

export const zRoleVerification = z.object({
  verifier: z.string(), // TODO: after discussing with bill determine if this should actually be a user
  role: zVerifiedRole,
});

export const backgroundCheckStatuses = [
  'Passed',
  'Failed',
  'In Progress',
] as const;
export const zBackgroundCheckStatus = z.enum(backgroundCheckStatuses);

const zVolunteer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
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
  previousOrganization: zObjectId,
});

export const zVolunteerResponse = zVolunteerEntity.extend({
  previousOrganization: zOrganizationResponse,
});

export const zCreateVolunteerRequest = zVolunteer.omit({
  roleVerifications: true,
  softDelete: true,
  backgroundCheck: true,
  previousOrganization: true,
  previousRole: true,
});

export const zUpdateVolunteerRequest = zCreateVolunteerRequest.partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface VolunteerEntity extends z.infer<typeof zVolunteerEntity> {}
export interface VolunteerResponse extends z.infer<typeof zVolunteerResponse> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}

export default zVolunteer;
