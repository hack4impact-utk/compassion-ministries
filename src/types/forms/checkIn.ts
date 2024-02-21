import { z } from 'zod';
import { zRole } from '../dataModel/roles';

const zCheckInFormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  role: zRole,
  organization: z.string().optional(),
});

export interface CheckInFormData extends z.infer<typeof zCheckInFormData> {}
