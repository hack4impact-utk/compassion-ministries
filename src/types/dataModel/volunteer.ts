import { z } from 'zod';
import zOrganization from './organization';

export const roles = ['Medical', 'Dental', 'Food', 'Save the Babies'] as const;
export const zRole = z.enum(roles);
export type Role = z.infer<typeof zRole>;

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
  roleVerifications: z
    .array(
      z.object({
        verifier: z.string(), // TODO: after discussing with bill determine if this should actually be a user
        lastUpdated: z.date(),
        role: zRole,
      })
    )
    .optional(),
  softDelete: z.boolean(),
});

export interface Volunteer extends z.infer<typeof zVolunteer> {}

export default zVolunteer;
