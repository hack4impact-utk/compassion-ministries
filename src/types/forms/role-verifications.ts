import { z } from 'zod';

const zUpsertRoleVerificationFormData = z.object({
  role: z.string(),
  lastUpdated: z.date().optional(),
  verifier: z.string(),
});

export interface UpsertRoleVerificationFormData
  extends z.infer<typeof zUpsertRoleVerificationFormData> {}
