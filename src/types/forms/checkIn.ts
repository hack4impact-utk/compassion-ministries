import { z } from 'zod';
import { zRole } from '../dataModel/roles';
import { zOrganizationResponse } from '../dataModel/organization';
import { zObjectId } from '../dataModel/base';

export const zCheckInFormData = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email().min(1, 'Required'),
  phoneNumber: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  role: zRole,
  organization: zOrganizationResponse.optional(),
  volunteerId: zObjectId.optional(),
});

export interface CheckInFormData extends z.infer<typeof zCheckInFormData> {}
