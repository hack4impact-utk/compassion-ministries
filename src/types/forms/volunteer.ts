import { z } from 'zod';
// Data Form for create/update Volunteer
const zUpsertVolunteerFormData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
});

export interface UpsertVolunteerFormData
  extends z.infer<typeof zUpsertVolunteerFormData> {}
