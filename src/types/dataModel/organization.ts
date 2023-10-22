import { z } from 'zod';

const zOrganization = z.object({
  name: z.string(),
  softDelete: z.boolean(),
});

export interface Organization extends z.infer<typeof zOrganization> {}

export default zOrganization;
