import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import { zOrganizationResponse } from '../dataModel/organization';

const zCheckInFormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  role: zRole,
  organization: zOrganizationResponse.optional(),
});

export interface CheckInFormData extends z.infer<typeof zCheckInFormData> {}
