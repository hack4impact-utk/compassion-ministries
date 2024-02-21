import { z } from 'zod';

// This is a list of roles that need verification to be assigned to a volunteer
export const verifiedRoles = ['Medical', 'Dental', 'Save the Babies'] as const;
export const zVerifiedRole = z.enum(verifiedRoles);
export type VerifiedRole = z.infer<typeof zVerifiedRole>;

// This is a list of all roles that a volunteer can have
export const roles = ['Food', ...verifiedRoles] as const;
export const zRole = z.enum(roles);
export type Role = z.infer<typeof zRole>;

export const zRoleVerification = z.object({
  verifier: z.string(),
  lastUpdated: z.date(),
  role: zVerifiedRole,
});

export const zRoleVerificationRequest = zRoleVerification.omit({
  lastUpdated: true,
});

export interface RoleVerification extends z.infer<typeof zRoleVerification> {}
export interface RoleVerificationRequest
  extends z.infer<typeof zRoleVerificationRequest> {}
