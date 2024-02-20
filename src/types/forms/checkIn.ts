import { z } from 'zod';
import { zRole } from '../dataModel/roles';

const zCheckInFormData = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  role: zRole.optional(),
  organization: z.string().optional(),
});

export interface CheckInFormData extends z.infer<typeof zCheckInFormData> {}
