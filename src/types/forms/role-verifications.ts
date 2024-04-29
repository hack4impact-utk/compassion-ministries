import { z } from 'zod';
import { zVerifiedRole } from '../dataModel/roles';

export const zUpsertRoleVerificationFormData = z.object({
  role: zVerifiedRole,
  verifier: z.string().min(1, 'Required'),
});

export interface UpsertRoleVerificationFormData
  extends z.infer<typeof zUpsertRoleVerificationFormData> {}
