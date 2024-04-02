import { z } from 'zod';
// Data Form for create/update Volunteer
export const zUpsertVolunteerFormData = z.object({
  firstName: z.string().nonempty('Required'),
  lastName: z.string().nonempty('Required'),
  email: z.string().email().nonempty('Required'),
  phoneNumber: z.string().nonempty('Required'),
  address: z.string().nonempty('Required'),
});

export interface UpsertVolunteerFormData
  extends z.infer<typeof zUpsertVolunteerFormData> {}
