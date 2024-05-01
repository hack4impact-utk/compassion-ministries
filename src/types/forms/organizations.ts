import { z } from 'zod';

export const zUpsertOrganizationFormData = z.object({
  name: z.string().min(1, 'Required'),
});

export interface UpsertOrganizationFormData
  extends z.infer<typeof zUpsertOrganizationFormData> {}
