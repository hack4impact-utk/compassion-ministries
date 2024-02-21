import { z } from 'zod';
import { zVerifiedRole } from '../dataModel/roles';

const zUpsertRoleVerificationFormData = z.object({
  role: zVerifiedRole,
  // lastUpdated: z.date().optional(),
  verifier: z.string(),
});

export interface UpsertRoleVerificationFormData
  extends z.infer<typeof zUpsertRoleVerificationFormData> {}
