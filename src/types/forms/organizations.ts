import { z } from 'zod';

const zUpsertOrganizationFormData = z.object({
  name: z.string().optional(),
});

export interface UpsertOrganizationFormData
  extends z.infer<typeof zUpsertOrganizationFormData> {}
