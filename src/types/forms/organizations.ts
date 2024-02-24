import { z } from 'zod';

const zUpsertOrganizationFormData = z.object({
  name: z.string(),
});

export interface UpsertOrganizationFormData
  extends z.infer<typeof zUpsertOrganizationFormData> {}
