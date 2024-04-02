import { z } from 'zod';
import { zVerifiedRole } from '../dataModel/roles';

export const zUpsertRoleVerificationFormData = z.object({
  role: zVerifiedRole,
  verifier: z.string().nonempty('Required'),
});

export interface UpsertRoleVerificationFormData
  extends z.infer<typeof zUpsertRoleVerificationFormData> {}
