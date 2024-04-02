import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import { zOrganizationResponse } from '../dataModel/organization';

export const zCheckInFormData = z.object({
  firstName: z.string().nonempty('Required'),
  lastName: z.string().nonempty('Required'),
  email: z.string().email().nonempty('Required'),
  phoneNumber: z.string().nonempty('Required'),
  address: z.string().nonempty('Required'),
  role: zRole,
  organization: zOrganizationResponse.optional(),
});

export interface CheckInFormData extends z.infer<typeof zCheckInFormData> {}
