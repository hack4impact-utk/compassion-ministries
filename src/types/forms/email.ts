import { z } from 'zod';

export const EmailFormData = z.object({
  subject: z.string().min(1, 'Required'),
  emailbody: z.string().min(1, 'Required'),
});

export interface EmailFormData extends z.infer<typeof EmailFormData> {}
