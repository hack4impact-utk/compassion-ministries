import { z } from 'zod';

export const EmailFormData = z.object({
  subject: z.string().nonempty('Required'),
  emailbody: z.string().nonempty('Required'),
});

export interface EmailFormData extends z.infer<typeof EmailFormData> {}
