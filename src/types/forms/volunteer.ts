import { z } from 'zod';
// Data Form for create/update Volunteer
export const zUpsertVolunteerFormData = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email().min(1, 'Required'),
  phoneNumber: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
});

export interface UpsertVolunteerFormData
  extends z.infer<typeof zUpsertVolunteerFormData> {}
